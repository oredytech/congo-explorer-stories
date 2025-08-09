
<?php
/*
Plugin Name: OT Contributor
Description: Système de gestion des contributeurs avec points et classements pour VISITE CONGO
Author: Oredy Technologies
Version: 1.0
*/

if (!defined('ABSPATH')) exit;

// --- Activation - Création des tables ---
register_activation_hook(__FILE__, 'ot_contributor_create_tables');
function ot_contributor_create_tables() {
    global $wpdb;
    $charset = $wpdb->get_charset_collate();

    // Table des contributeurs
    $contributors_table = $wpdb->prefix . 'ot_contributors';
    $sql_contributors = "CREATE TABLE IF NOT EXISTS $contributors_table (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        wp_user_id BIGINT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        type ENUM('photographer', 'videographer', 'blogger') NOT NULL,
        points INT DEFAULT 0,
        total_contributions INT DEFAULT 0,
        location VARCHAR(255),
        bio TEXT,
        avatar_url VARCHAR(500),
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_email (email)
    ) $charset;";

    // Table des contributions
    $contributions_table = $wpdb->prefix . 'ot_contributions';
    $sql_contributions = "CREATE TABLE IF NOT EXISTS $contributions_table (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        contributor_id BIGINT NOT NULL,
        title VARCHAR(500) NOT NULL,
        type ENUM('photo', 'video', 'article') NOT NULL,
        content_url VARCHAR(1000) NOT NULL,
        description TEXT,
        province VARCHAR(100) NOT NULL,
        tags TEXT,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        points_awarded INT DEFAULT 0,
        admin_notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (contributor_id) REFERENCES $contributors_table(id) ON DELETE CASCADE
    ) $charset;";

    // Table des classements mensuels
    $rankings_table = $wpdb->prefix . 'ot_monthly_rankings';
    $sql_rankings = "CREATE TABLE IF NOT EXISTS $rankings_table (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        contributor_id BIGINT NOT NULL,
        year YEAR NOT NULL,
        month TINYINT NOT NULL,
        rank_position INT NOT NULL,
        points_earned INT NOT NULL,
        contributions_count INT NOT NULL,
        is_winner BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_ranking (contributor_id, year, month),
        FOREIGN KEY (contributor_id) REFERENCES $contributors_table(id) ON DELETE CASCADE
    ) $charset;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql_contributors);
    dbDelta($sql_contributions);
    dbDelta($sql_rankings);
}

// --- Menu d'administration ---
add_action('admin_menu', 'ot_contributor_admin_menu');
function ot_contributor_admin_menu() {
    add_menu_page(
        'OT Contributor',
        'OT Contributor',
        'manage_options',
        'ot-contributor',
        'ot_contributor_admin_page',
        'dashicons-groups',
        30
    );
    
    add_submenu_page(
        'ot-contributor',
        'Contributeurs',
        'Contributeurs',
        'manage_options',
        'ot-contributor-users',
        'ot_contributor_users_page'
    );
    
    add_submenu_page(
        'ot-contributor',
        'Contributions',
        'Contributions',
        'manage_options',
        'ot-contributor-content',
        'ot_contributor_content_page'
    );
    
    add_submenu_page(
        'ot-contributor',
        'Classements',
        'Classements',
        'manage_options',
        'ot-contributor-rankings',
        'ot_contributor_rankings_page'
    );
}

// --- API REST ---
add_action('rest_api_init', 'ot_contributor_register_routes');
function ot_contributor_register_routes() {
    // Route pour l'authentification
    register_rest_route('ot-contributor/v1', '/auth', [
        'methods' => 'POST',
        'callback' => 'ot_contributor_authenticate',
        'permission_callback' => '__return_true'
    ]);
    
    // Route pour récupérer le profil utilisateur
    register_rest_route('ot-contributor/v1', '/profile/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'ot_contributor_get_profile',
        'permission_callback' => '__return_true'
    ]);
    
    // Route pour soumettre une contribution
    register_rest_route('ot-contributor/v1', '/contribute', [
        'methods' => 'POST',
        'callback' => 'ot_contributor_submit',
        'permission_callback' => 'ot_contributor_check_auth'
    ]);
    
    // Route pour récupérer les contributions d'un utilisateur
    register_rest_route('ot-contributor/v1', '/contributions/(?P<user_id>\d+)', [
        'methods' => 'GET',
        'callback' => 'ot_contributor_get_contributions',
        'permission_callback' => '__return_true'
    ]);
    
    // Route pour les classements
    register_rest_route('ot-contributor/v1', '/rankings', [
        'methods' => 'GET',
        'callback' => 'ot_contributor_get_rankings',
        'permission_callback' => '__return_true'
    ]);
}

// --- Fonctions API ---
function ot_contributor_authenticate($request) {
    $email = sanitize_email($request->get_param('email'));
    $password = $request->get_param('password');
    
    $user = wp_authenticate($email, $password);
    
    if (is_wp_error($user)) {
        return new WP_Error('auth_failed', 'Identifiants incorrects', ['status' => 401]);
    }
    
    global $wpdb;
    $contributor = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}ot_contributors WHERE wp_user_id = %d",
        $user->ID
    ));
    
    if (!$contributor) {
        return new WP_Error('not_contributor', 'Utilisateur non enregistré comme contributeur', ['status' => 403]);
    }
    
    return [
        'success' => true,
        'user' => [
            'id' => $contributor->id,
            'name' => $contributor->name,
            'email' => $contributor->email,
            'type' => $contributor->type,
            'points' => $contributor->points,
            'contributions' => $contributor->total_contributions,
            'location' => $contributor->location,
            'avatar' => $contributor->avatar_url
        ],
        'token' => wp_create_nonce('ot_contributor_' . $contributor->id)
    ];
}

function ot_contributor_get_profile($request) {
    global $wpdb;
    $contributor_id = intval($request['id']);
    
    $contributor = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}ot_contributors WHERE id = %d",
        $contributor_id
    ));
    
    if (!$contributor) {
        return new WP_Error('not_found', 'Contributeur non trouvé', ['status' => 404]);
    }
    
    // Calculer le rang actuel
    $rank = $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) + 1 FROM {$wpdb->prefix}ot_contributors WHERE points > %d",
        $contributor->points
    ));
    
    return [
        'id' => $contributor->id,
        'name' => $contributor->name,
        'email' => $contributor->email,
        'type' => $contributor->type,
        'points' => intval($contributor->points),
        'contributions' => intval($contributor->total_contributions),
        'rank' => intval($rank),
        'location' => $contributor->location,
        'bio' => $contributor->bio,
        'avatar' => $contributor->avatar_url,
        'joinDate' => $contributor->created_at
    ];
}

function ot_contributor_submit($request) {
    global $wpdb;
    
    $contributor_id = intval($request->get_param('contributor_id'));
    $title = sanitize_text_field($request->get_param('title'));
    $type = sanitize_text_field($request->get_param('type'));
    $content_url = esc_url_raw($request->get_param('url'));
    $description = sanitize_textarea_field($request->get_param('description'));
    $province = sanitize_text_field($request->get_param('province'));
    $tags = sanitize_text_field($request->get_param('tags'));
    
    // Validation des provinces congolaises
    $valid_provinces = [
        'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe',
        'Équateur', 'Mongala', 'Nord-Ubangi', 'Sud-Ubangi', 'Tshuapa',
        'Haut-Lomami', 'Haut-Katanga', 'Lualaba', 'Kasaï', 'Kasaï-Central',
        'Kasaï-Oriental', 'Lomami', 'Sankuru', 'Bas-Uele', 'Haut-Uele',
        'Ituri', 'Tshopo', 'Nord-Kivu', 'Sud-Kivu', 'Maniema', 'Tanganyika'
    ];
    
    if (!in_array($province, $valid_provinces)) {
        return new WP_Error('invalid_province', 'Province invalide', ['status' => 400]);
    }
    
    $result = $wpdb->insert(
        $wpdb->prefix . 'ot_contributions',
        [
            'contributor_id' => $contributor_id,
            'title' => $title,
            'type' => $type,
            'content_url' => $content_url,
            'description' => $description,
            'province' => $province,
            'tags' => $tags,
            'status' => 'pending'
        ],
        ['%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s']
    );
    
    if ($result === false) {
        return new WP_Error('submission_failed', 'Erreur lors de la soumission', ['status' => 500]);
    }
    
    return [
        'success' => true,
        'message' => 'Contribution soumise avec succès',
        'contribution_id' => $wpdb->insert_id
    ];
}

function ot_contributor_get_contributions($request) {
    global $wpdb;
    $user_id = intval($request['user_id']);
    
    $contributions = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}ot_contributions WHERE contributor_id = %d ORDER BY created_at DESC",
        $user_id
    ));
    
    return array_map(function($contrib) {
        return [
            'id' => $contrib->id,
            'title' => $contrib->title,
            'type' => $contrib->type,
            'url' => $contrib->content_url,
            'description' => $contrib->description,
            'province' => $contrib->province,
            'status' => $contrib->status,
            'points' => intval($contrib->points_awarded),
            'createdAt' => $contrib->created_at
        ];
    }, $contributions);
}

function ot_contributor_get_rankings($request) {
    global $wpdb;
    $month = intval($request->get_param('month')) ?: date('n');
    $year = intval($request->get_param('year')) ?: date('Y');
    
    $rankings = $wpdb->get_results($wpdb->prepare(
        "SELECT r.*, c.name, c.type, c.location 
         FROM {$wpdb->prefix}ot_monthly_rankings r
         JOIN {$wpdb->prefix}ot_contributors c ON r.contributor_id = c.id
         WHERE r.year = %d AND r.month = %d
         ORDER BY r.rank_position ASC",
        $year, $month
    ));
    
    return array_map(function($rank) {
        return [
            'position' => intval($rank->rank_position),
            'contributor' => [
                'id' => $rank->contributor_id,
                'name' => $rank->name,
                'type' => $rank->type,
                'location' => $rank->location
            ],
            'points' => intval($rank->points_earned),
            'contributions' => intval($rank->contributions_count),
            'isWinner' => (bool)$rank->is_winner
        ];
    }, $rankings);
}

// --- Fonction de vérification d'authentification ---
function ot_contributor_check_auth($request) {
    $token = $request->get_header('Authorization');
    if (!$token) return false;
    
    $token = str_replace('Bearer ', '', $token);
    return wp_verify_nonce($token, 'ot_contributor_*');
}

// --- Tâche cron pour calculer les classements mensuels ---
add_action('wp', 'ot_contributor_schedule_ranking_calculation');
function ot_contributor_schedule_ranking_calculation() {
    if (!wp_next_scheduled('ot_contributor_calculate_rankings')) {
        wp_schedule_event(time(), 'daily', 'ot_contributor_calculate_rankings');
    }
}

add_action('ot_contributor_calculate_rankings', 'ot_contributor_process_monthly_rankings');
function ot_contributor_process_monthly_rankings() {
    global $wpdb;
    
    $current_month = date('n');
    $current_year = date('Y');
    $last_month = ($current_month == 1) ? 12 : $current_month - 1;
    $last_month_year = ($current_month == 1) ? $current_year - 1 : $current_year;
    
    // Si on est le 1er du mois, calculer les classements du mois précédent
    if (date('j') == 1) {
        // Récupérer les contributions approuvées du mois précédent
        $contributors_stats = $wpdb->get_results($wpdb->prepare(
            "SELECT 
                c.contributor_id,
                COUNT(*) as contributions_count,
                SUM(c.points_awarded) as total_points
             FROM {$wpdb->prefix}ot_contributions c
             WHERE c.status = 'approved' 
               AND YEAR(c.created_at) = %d 
               AND MONTH(c.created_at) = %d
             GROUP BY c.contributor_id
             ORDER BY total_points DESC, contributions_count DESC",
            $last_month_year, $last_month
        ));
        
        // Supprimer les anciens classements du mois
        $wpdb->delete(
            $wpdb->prefix . 'ot_monthly_rankings',
            ['year' => $last_month_year, 'month' => $last_month],
            ['%d', '%d']
        );
        
        // Insérer les nouveaux classements
        $position = 1;
        foreach ($contributors_stats as $stat) {
            $is_winner = ($position == 1);
            
            $wpdb->insert(
                $wpdb->prefix . 'ot_monthly_rankings',
                [
                    'contributor_id' => $stat->contributor_id,
                    'year' => $last_month_year,
                    'month' => $last_month,
                    'rank_position' => $position,
                    'points_earned' => $stat->total_points,
                    'contributions_count' => $stat->contributions_count,
                    'is_winner' => $is_winner
                ],
                ['%d', '%d', '%d', '%d', '%d', '%d', '%d']
            );
            
            // Bonus pour le gagnant du mois
            if ($is_winner) {
                $wpdb->query($wpdb->prepare(
                    "UPDATE {$wpdb->prefix}ot_contributors 
                     SET points = points + 100 
                     WHERE id = %d",
                    $stat->contributor_id
                ));
                
                // Envoyer notification au gagnant
                ot_contributor_notify_monthly_winner($stat->contributor_id);
            }
            
            $position++;
        }
    }
}

// --- Fonction de notification du gagnant ---
function ot_contributor_notify_monthly_winner($contributor_id) {
    global $wpdb;
    
    $contributor = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}ot_contributors WHERE id = %d",
        $contributor_id
    ));
    
    if ($contributor) {
        $subject = "🏆 Félicitations ! Vous êtes le contributeur du mois !";
        $message = "
        Bonjour {$contributor->name},
        
        Nous avons le plaisir de vous annoncer que vous êtes le contributeur du mois !
        
        Vous avez gagné 100 points bonus et êtes maintenant reconnu comme l'un de nos meilleurs contributeurs.
        
        Continuez votre excellent travail pour promouvoir les merveilles de la RDC !
        
        L'équipe VISITE CONGO
        ";
        
        wp_mail($contributor->email, $subject, $message);
    }
}

// --- Pages d'administration ---
function ot_contributor_admin_page() {
    echo '<div class="wrap">';
    echo '<h1>OT Contributor - Dashboard</h1>';
    echo '<p>Système de gestion des contributeurs pour VISITE CONGO</p>';
    echo '</div>';
}

function ot_contributor_users_page() {
    global $wpdb;
    
    $contributors = $wpdb->get_results(
        "SELECT * FROM {$wpdb->prefix}ot_contributors ORDER BY points DESC"
    );
    
    echo '<div class="wrap">';
    echo '<h1>Contributeurs</h1>';
    echo '<table class="widefat">';
    echo '<thead><tr><th>Nom</th><th>Type</th><th>Points</th><th>Contributions</th><th>Statut</th></tr></thead>';
    echo '<tbody>';
    
    foreach ($contributors as $contributor) {
        echo "<tr>";
        echo "<td>{$contributor->name}</td>";
        echo "<td>" . ucfirst($contributor->type) . "</td>";
        echo "<td>{$contributor->points}</td>";
        echo "<td>{$contributor->total_contributions}</td>";
        echo "<td>" . ucfirst($contributor->status) . "</td>";
        echo "</tr>";
    }
    
    echo '</tbody></table>';
    echo '</div>';
}

function ot_contributor_content_page() {
    echo '<div class="wrap">';
    echo '<h1>Gestion des contributions</h1>';
    echo '<p>Interface de modération des contenus soumis par les contributeurs.</p>';
    echo '</div>';
}

function ot_contributor_rankings_page() {
    echo '<div class="wrap">';
    echo '<h1>Classements mensuels</h1>';
    echo '<p>Visualisation des classements et gagnants mensuels.</p>';
    echo '</div>';
}

// --- Hook pour mettre à jour les statistiques des contributeurs ---
add_action('ot_contribution_approved', 'ot_contributor_update_stats');
function ot_contributor_update_stats($contribution_id) {
    global $wpdb;
    
    // Récupérer la contribution
    $contribution = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}ot_contributions WHERE id = %d",
        $contribution_id
    ));
    
    if ($contribution && $contribution->status === 'approved') {
        // Calculer les points selon le type de contenu
        $points = 0;
        switch ($contribution->type) {
            case 'photo': $points = 10; break;
            case 'video': $points = 25; break;
            case 'article': $points = 15; break;
        }
        
        // Mettre à jour les points dans la contribution
        $wpdb->update(
            $wpdb->prefix . 'ot_contributions',
            ['points_awarded' => $points],
            ['id' => $contribution_id],
            ['%d'], ['%d']
        );
        
        // Mettre à jour les statistiques du contributeur
        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->prefix}ot_contributors 
             SET points = points + %d, total_contributions = total_contributions + 1
             WHERE id = %d",
            $points, $contribution->contributor_id
        ));
    }
}
