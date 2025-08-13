
<?php
/**
 * Plugin Name: OT Contributor
 * Description: Gestion des contributeurs pour Visite Congo
 * Version: 1.0
 * Author: Visite Congo
 */

// Empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

class OTContributor {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
        register_activation_hook(__FILE__, array($this, 'create_tables'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
    }
    
    public function init() {
        // Initialisation du plugin
    }
    
    public function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'ot_contributors';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name tinytext NOT NULL,
            email varchar(100) NOT NULL,
            password varchar(255) NOT NULL,
            type varchar(50) NOT NULL,
            location varchar(100) NOT NULL,
            bio text,
            points int DEFAULT 0,
            status varchar(20) DEFAULT 'pending',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY email (email)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        // Table pour les contributions
        $contributions_table = $wpdb->prefix . 'ot_contributions';
        
        $sql_contributions = "CREATE TABLE $contributions_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            contributor_id mediumint(9) NOT NULL,
            title tinytext NOT NULL,
            type varchar(50) NOT NULL,
            url text NOT NULL,
            description text,
            province varchar(100),
            tags text,
            status varchar(20) DEFAULT 'pending',
            points int DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY contributor_id (contributor_id)
        ) $charset_collate;";
        
        dbDelta($sql_contributions);
    }
    
    public function register_api_routes() {
        // Route pour l'inscription
        register_rest_route('ot-contributor/v1', '/register', array(
            'methods' => 'POST',
            'callback' => array($this, 'register_contributor'),
            'permission_callback' => '__return_true'
        ));
        
        // Route pour la connexion
        register_rest_route('ot-contributor/v1', '/auth', array(
            'methods' => 'POST',
            'callback' => array($this, 'authenticate_contributor'),
            'permission_callback' => '__return_true'
        ));
        
        // Route pour soumettre une contribution
        register_rest_route('ot-contributor/v1', '/contribute', array(
            'methods' => 'POST',
            'callback' => array($this, 'submit_contribution'),
            'permission_callback' => array($this, 'check_contributor_permission')
        ));
        
        // Route pour récupérer le profil
        register_rest_route('ot-contributor/v1', '/profile/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_contributor_profile'),
            'permission_callback' => array($this, 'check_contributor_permission')
        ));
    }
    
    public function register_contributor($request) {
        global $wpdb;
        
        $name = sanitize_text_field($request->get_param('name'));
        $email = sanitize_email($request->get_param('email'));
        $password = $request->get_param('password');
        $type = sanitize_text_field($request->get_param('type'));
        $location = sanitize_text_field($request->get_param('location'));
        $bio = sanitize_textarea_field($request->get_param('bio'));
        
        if (empty($name) || empty($email) || empty($password) || empty($type)) {
            return new WP_Error('missing_fields', 'Tous les champs requis doivent être remplis', array('status' => 400));
        }
        
        // Vérifier si l'email existe déjà
        $table_name = $wpdb->prefix . 'ot_contributors';
        $existing_user = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM $table_name WHERE email = %s",
            $email
        ));
        
        if ($existing_user) {
            return new WP_Error('email_exists', 'Cet email est déjà utilisé', array('status' => 409));
        }
        
        // Hasher le mot de passe
        $hashed_password = wp_hash_password($password);
        
        // Insérer le nouveau contributeur
        $result = $wpdb->insert(
            $table_name,
            array(
                'name' => $name,
                'email' => $email,
                'password' => $hashed_password,
                'type' => $type,
                'location' => $location,
                'bio' => $bio,
                'status' => 'pending'
            )
        );
        
        if ($result === false) {
            return new WP_Error('db_error', 'Erreur lors de l\'inscription', array('status' => 500));
        }
        
        return array(
            'success' => true,
            'message' => 'Inscription réussie. Votre compte est en attente de validation.',
            'contributor_id' => $wpdb->insert_id
        );
    }
    
    public function authenticate_contributor($request) {
        global $wpdb;
        
        $email = sanitize_email($request->get_param('email'));
        $password = $request->get_param('password');
        
        $table_name = $wpdb->prefix . 'ot_contributors';
        $contributor = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE email = %s",
            $email
        ));
        
        if (!$contributor || !wp_check_password($password, $contributor->password)) {
            return new WP_Error('invalid_credentials', 'Email ou mot de passe incorrect', array('status' => 401));
        }
        
        if ($contributor->status !== 'approved') {
            return new WP_Error('account_pending', 'Votre compte est en attente de validation', array('status' => 403));
        }
        
        // Générer un token simple (en production, utilisez JWT)
        $token = wp_generate_password(32, false);
        
        return array(
            'success' => true,
            'token' => $token,
            'user' => array(
                'id' => $contributor->id,
                'name' => $contributor->name,
                'email' => $contributor->email,
                'type' => $contributor->type,
                'location' => $contributor->location,
                'points' => $contributor->points
            )
        );
    }
    
    public function submit_contribution($request) {
        global $wpdb;
        
        // Récupérer l'ID du contributeur (simulation)
        $contributor_id = 1; // En production, extraire du token
        
        $title = sanitize_text_field($request->get_param('title'));
        $type = sanitize_text_field($request->get_param('type'));
        $url = esc_url_raw($request->get_param('url'));
        $description = sanitize_textarea_field($request->get_param('description'));
        $province = sanitize_text_field($request->get_param('province'));
        $tags = sanitize_text_field($request->get_param('tags'));
        
        $contributions_table = $wpdb->prefix . 'ot_contributions';
        
        $result = $wpdb->insert(
            $contributions_table,
            array(
                'contributor_id' => $contributor_id,
                'title' => $title,
                'type' => $type,
                'url' => $url,
                'description' => $description,
                'province' => $province,
                'tags' => $tags,
                'status' => 'pending'
            )
        );
        
        if ($result === false) {
            return new WP_Error('db_error', 'Erreur lors de la soumission', array('status' => 500));
        }
        
        return array(
            'success' => true,
            'message' => 'Contribution soumise avec succès',
            'contribution_id' => $wpdb->insert_id
        );
    }
    
    public function get_contributor_profile($request) {
        global $wpdb;
        
        $contributor_id = $request->get_param('id');
        $table_name = $wpdb->prefix . 'ot_contributors';
        
        $contributor = $wpdb->get_row($wpdb->prepare(
            "SELECT id, name, email, type, location, bio, points, created_at FROM $table_name WHERE id = %d",
            $contributor_id
        ));
        
        if (!$contributor) {
            return new WP_Error('not_found', 'Contributeur non trouvé', array('status' => 404));
        }
        
        return $contributor;
    }
    
    public function check_contributor_permission() {
        // Vérification simple (en production, vérifier le token JWT)
        return true;
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'OT Contributor',
            'Contributeurs',
            'manage_options',
            'ot-contributor',
            array($this, 'admin_page'),
            'dashicons-groups',
            30
        );
        
        add_submenu_page(
            'ot-contributor',
            'Contributions',
            'Contributions',
            'manage_options',
            'ot-contributor-contributions',
            array($this, 'contributions_page')
        );
    }
    
    public function admin_page() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'ot_contributors';
        
        // Traiter les actions
        if (isset($_GET['action']) && isset($_GET['contributor_id'])) {
            $contributor_id = intval($_GET['contributor_id']);
            $action = sanitize_text_field($_GET['action']);
            
            if ($action === 'approve') {
                $wpdb->update(
                    $table_name,
                    array('status' => 'approved'),
                    array('id' => $contributor_id)
                );
                echo '<div class="notice notice-success"><p>Contributeur approuvé avec succès.</p></div>';
            } elseif ($action === 'reject') {
                $wpdb->update(
                    $table_name,
                    array('status' => 'rejected'),
                    array('id' => $contributor_id)
                );
                echo '<div class="notice notice-success"><p>Contributeur rejeté.</p></div>';
            }
        }
        
        $contributors = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
        
        ?>
        <div class="wrap">
            <h1>Gestion des Contributeurs</h1>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Localisation</th>
                        <th>Points</th>
                        <th>Statut</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($contributors as $contributor): ?>
                    <tr>
                        <td><?php echo $contributor->id; ?></td>
                        <td><?php echo esc_html($contributor->name); ?></td>
                        <td><?php echo esc_html($contributor->email); ?></td>
                        <td><?php echo esc_html($contributor->type); ?></td>
                        <td><?php echo esc_html($contributor->location); ?></td>
                        <td><?php echo $contributor->points; ?></td>
                        <td>
                            <span class="status-<?php echo $contributor->status; ?>">
                                <?php echo ucfirst($contributor->status); ?>
                            </span>
                        </td>
                        <td><?php echo date('d/m/Y', strtotime($contributor->created_at)); ?></td>
                        <td>
                            <?php if ($contributor->status === 'pending'): ?>
                                <a href="?page=ot-contributor&action=approve&contributor_id=<?php echo $contributor->id; ?>" 
                                   class="button button-primary">Approuver</a>
                                <a href="?page=ot-contributor&action=reject&contributor_id=<?php echo $contributor->id; ?>" 
                                   class="button">Rejeter</a>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <style>
        .status-pending { color: #d63638; }
        .status-approved { color: #00a32a; }
        .status-rejected { color: #646970; }
        </style>
        <?php
    }
    
    public function contributions_page() {
        global $wpdb;
        
        $contributions_table = $wpdb->prefix . 'ot_contributions';
        $contributors_table = $wpdb->prefix . 'ot_contributors';
        
        // Traiter les actions
        if (isset($_GET['action']) && isset($_GET['contribution_id'])) {
            $contribution_id = intval($_GET['contribution_id']);
            $action = sanitize_text_field($_GET['action']);
            
            if ($action === 'approve') {
                $wpdb->update(
                    $contributions_table,
                    array('status' => 'approved', 'points' => 10),
                    array('id' => $contribution_id)
                );
                
                // Ajouter les points au contributeur
                $contribution = $wpdb->get_row($wpdb->prepare(
                    "SELECT contributor_id FROM $contributions_table WHERE id = %d",
                    $contribution_id
                ));
                
                if ($contribution) {
                    $wpdb->query($wpdb->prepare(
                        "UPDATE $contributors_table SET points = points + 10 WHERE id = %d",
                        $contribution->contributor_id
                    ));
                }
                
                echo '<div class="notice notice-success"><p>Contribution approuvée avec succès.</p></div>';
            } elseif ($action === 'reject') {
                $wpdb->update(
                    $contributions_table,
                    array('status' => 'rejected'),
                    array('id' => $contribution_id)
                );
                echo '<div class="notice notice-success"><p>Contribution rejetée.</p></div>';
            }
        }
        
        $contributions = $wpdb->get_results("
            SELECT c.*, cont.name as contributor_name 
            FROM $contributions_table c 
            LEFT JOIN $contributors_table cont ON c.contributor_id = cont.id 
            ORDER BY c.created_at DESC
        ");
        
        ?>
        <div class="wrap">
            <h1>Gestion des Contributions</h1>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Type</th>
                        <th>Contributeur</th>
                        <th>Province</th>
                        <th>Statut</th>
                        <th>Points</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($contributions as $contribution): ?>
                    <tr>
                        <td><?php echo $contribution->id; ?></td>
                        <td><?php echo esc_html($contribution->title); ?></td>
                        <td><?php echo esc_html($contribution->type); ?></td>
                        <td><?php echo esc_html($contribution->contributor_name); ?></td>
                        <td><?php echo esc_html($contribution->province); ?></td>
                        <td>
                            <span class="status-<?php echo $contribution->status; ?>">
                                <?php echo ucfirst($contribution->status); ?>
                            </span>
                        </td>
                        <td><?php echo $contribution->points; ?></td>
                        <td><?php echo date('d/m/Y', strtotime($contribution->created_at)); ?></td>
                        <td>
                            <?php if ($contribution->status === 'pending'): ?>
                                <a href="?page=ot-contributor-contributions&action=approve&contribution_id=<?php echo $contribution->id; ?>" 
                                   class="button button-primary">Approuver</a>
                                <a href="?page=ot-contributor-contributions&action=reject&contribution_id=<?php echo $contribution->id; ?>" 
                                   class="button">Rejeter</a>
                            <?php endif; ?>
                            <a href="<?php echo esc_url($contribution->url); ?>" target="_blank" class="button">Voir</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
    
    public function enqueue_admin_scripts() {
        // Ajouter des styles et scripts pour l'admin si nécessaire
    }
}

new OTContributor();
