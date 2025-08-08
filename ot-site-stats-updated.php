<?php
/*
Plugin Name: OT Site Stats
Description: Plugin de statistiques complètes pour articles WordPress consultés via un frontend TSX.
Author: Oredy Technologies
Version: 2.0
*/

if (!defined('ABSPATH')) exit;

// Inclure les fichiers CSS et JS dans l'admin
add_action('admin_enqueue_scripts', function($hook) {
    if (strpos($hook, 'ot-site-stats') !== false) {
        wp_enqueue_script('chart-js', 'https://cdn.jsdelivr.net/npm/chart.js', [], '3.9.1');
        wp_enqueue_style('ot-stats-admin', plugin_dir_url(__FILE__) . 'ot-site-stats-admin.css', [], '2.0');
        wp_enqueue_script('ot-stats-dashboard', plugin_dir_url(__FILE__) . 'ot-stats-dashboard.js', ['chart-js'], '2.0', true);
        
        // Localiser les variables pour JavaScript
        wp_localize_script('ot-stats-dashboard', 'otStats', [
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ot_stats_nonce')
        ]);
    }
});

// --- Fonction de standardisation des noms de pays ---
function ot_standardize_country($country) {
    $map = [
        'Congo' => 'Democratic Republic of the Congo',
        'République du Congo' => 'Republic of the Congo',
        'Côte d\'Ivoire' => 'Ivory Coast',
        'Inconnu' => null,
    ];
    return $map[$country] ?? $country;
}

// --- Activation - création de la table ---
register_activation_hook(__FILE__, function () {
    global $wpdb;
    $table = $wpdb->prefix . 'ot_stats';
    $charset = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        post_id BIGINT NOT NULL,
        ip_address VARCHAR(100),
        country VARCHAR(100),
        user_agent TEXT,
        referrer TEXT,
        session_id VARCHAR(100),
        view_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_post_id (post_id),
        INDEX idx_view_date (view_date),
        INDEX idx_country (country)
    ) $charset;";
    
    // Table pour les vues personnalisées
    $table_manual = $wpdb->prefix . 'ot_stats_manual';
    $sql_manual = "CREATE TABLE IF NOT EXISTS $table_manual (
        post_id BIGINT PRIMARY KEY,
        manual_views INT DEFAULT NULL
    ) $charset;";
    
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
    dbDelta($sql_manual);
});

// --- REST API ---
add_action('rest_api_init', function () {
    register_rest_route('otstats/v1', '/track', [
        'methods' => 'POST',
        'callback' => 'ot_track_view',
        'permission_callback' => '__return_true'
    ]);
    register_rest_route('otstats/v1', '/views/(?P<id>\\d+)', [
        'methods' => 'GET',
        'callback' => 'ot_get_views',
        'permission_callback' => '__return_true'
    ]);
    register_rest_route('otstats/v1', '/display-views/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'ot_display_views',
        'permission_callback' => '__return_true'
    ]);
});

function ot_track_view($request) {
    global $wpdb;
    $post_id = intval($request->get_param('post_id'));
    $ip = $_SERVER['REMOTE_ADDR'];
    $agent = $_SERVER['HTTP_USER_AGENT'];
    $referrer = $_SERVER['HTTP_REFERER'] ?? '';
    $session_id = session_id() ?: uniqid();
    
    // Géolocalisation
    $geo = json_decode(@file_get_contents("http://ip-api.com/json/{$ip}"));
    $country = $geo->country ?? 'Inconnu';
    $country = ot_standardize_country($country);

    if (!$country) {
        return ['success' => false, 'error' => 'Pays non reconnu'];
    }

    $wpdb->insert($wpdb->prefix . 'ot_stats', [
        'post_id' => $post_id,
        'ip_address' => $ip,
        'user_agent' => $agent,
        'country' => $country,
        'referrer' => $referrer,
        'session_id' => $session_id
    ]);

    return ['success' => true];
}

function ot_get_views($request) {
    global $wpdb;
    $post_id = intval($request['id']);
    $count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}ot_stats WHERE post_id = %d", $post_id));
    return ['post_id' => $post_id, 'views' => intval($count)];
}

function ot_display_views($request) {
    global $wpdb;
    $post_id = intval($request['id']);

    if (get_post_status($post_id) === false) {
        return new WP_Error('not_found', 'Article introuvable', ['status' => 404]);
    }

    $manual = $wpdb->get_var($wpdb->prepare(
        "SELECT manual_views FROM {$wpdb->prefix}ot_stats_manual WHERE post_id = %d",
        $post_id
    ));
    if ($manual !== null) {
        return [
            'post_id' => $post_id,
            'views'   => intval($manual),
            'source'  => 'manual'
        ];
    }

    $real_views = $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) FROM {$wpdb->prefix}ot_stats WHERE post_id = %d",
        $post_id
    ));
    if ($real_views > 0) {
        return [
            'post_id' => $post_id,
            'views'   => intval($real_views),
            'source'  => 'tracked'
        ];
    }

    $default = get_option('ot_stats_default_views', 0);
    return [
        'post_id' => $post_id,
        'views'   => intval($default),
        'source'  => 'default'
    ];
}

// --- Admin menu ---
add_action('admin_menu', function () {
    add_menu_page(
        'OT Site Stats', 
        'OT Site Stats', 
        'manage_options', 
        'ot-site-stats', 
        'ot_stats_admin_page', 
        'dashicons-chart-bar'
    );
    add_submenu_page(
        'ot-site-stats', 
        'Paramètres', 
        'Paramètres', 
        'manage_options', 
        'ot-site-stats-settings', 
        'ot_stats_settings_page'
    );
});

// --- Paramètres ---
add_action('admin_init', function () {
    register_setting('ot_stats_settings_group', 'ot_tsx_site_url');
    register_setting('ot_stats_settings_group', 'ot_stats_default_views');

    add_settings_section('ot_stats_main_section', 'Paramètres de l\'intégration TSX', null, 'ot-site-stats-settings');

    add_settings_field('ot_tsx_site_url', 'URL du site TSX', function () {
        $value = get_option('ot_tsx_site_url', '');
        echo "<input type='url' name='ot_tsx_site_url' value='" . esc_attr($value) . "' style='width: 100%' />";
    }, 'ot-site-stats-settings', 'ot_stats_main_section');

    add_settings_field('ot_stats_default_views', 'Nombre de vues par défaut pour les nouveaux articles', function () {
        $value = get_option('ot_stats_default_views', '0');
        echo "<input type='number' name='ot_stats_default_views' value='" . esc_attr($value) . "' min='0' style='width: 100px;' />";
        echo '<p class="description">Ce nombre sera utilisé pour les nouveaux articles ou ceux sans valeur personnalisée.</p>';
    }, 'ot-site-stats-settings', 'ot_stats_main_section');
});

function ot_stats_settings_page() {
    echo '<div class="wrap"><h1>Paramètres de OT Site Stats</h1>';
    echo '<form method="post" action="options.php">';
    settings_fields('ot_stats_settings_group');
    do_settings_sections('ot-site-stats-settings');
    submit_button();
    echo '</form></div>';
}

// --- Nouvelles fonctions AJAX pour le dashboard ---
add_action('wp_ajax_ot_stats_range', 'ot_stats_range_ajax');
add_action('wp_ajax_ot_stats_summary', 'ot_stats_summary_ajax');
add_action('wp_ajax_ot_stats_countries', 'ot_stats_countries_ajax');
add_action('wp_ajax_ot_stats_hourly', 'ot_stats_hourly_ajax');

function ot_stats_range_ajax() {
    if (!wp_verify_nonce($_GET['nonce'] ?? '', 'ot_stats_nonce')) {
        wp_die('Nonce invalide');
    }
    
    global $wpdb;
    $table = $wpdb->prefix . 'ot_stats';
    $period = sanitize_text_field($_GET['period'] ?? 'week');

    switch ($period) {
        case 'day':
            $where = "view_date >= CURDATE()";
            $group = "HOUR(view_date)";
            $format = "H'h'";
            break;
        case 'month':
            $where = "view_date >= DATE_FORMAT(CURDATE(),'%Y-%m-01')";
            $group = "DATE(view_date)";
            $format = "%d/%m";
            break;
        case 'year':
            $where = "view_date >= DATE_FORMAT(CURDATE(),'%Y-01-01')";
            $group = "DATE_FORMAT(view_date, '%Y-%m')";
            $format = "%m/%Y";
            break;
        case 'custom':
            $start = sanitize_text_field($_GET['start_date'] ?? '');
            $end = sanitize_text_field($_GET['end_date'] ?? '');
            if ($start && $end) {
                $where = $wpdb->prepare("view_date BETWEEN %s AND %s", $start, $end . ' 23:59:59');
                $group = "DATE(view_date)";
                $format = "%d/%m";
            } else {
                $where = "view_date >= CURDATE() - INTERVAL 7 DAY";
                $group = "DATE(view_date)";
                $format = "%d/%m";
            }
            break;
        case 'week':
        default:
            $where = "view_date >= CURDATE() - INTERVAL 7 DAY";
            $group = "DATE(view_date)";
            $format = "%d/%m";
    }

    $results = $wpdb->get_results("
        SELECT $group as label, COUNT(*) as views 
        FROM $table 
        WHERE $where 
        GROUP BY $group 
        ORDER BY label
    ");

    $labels = [];
    $views = [];
    foreach ($results as $row) {
        $labels[] = $row->label;
        $views[] = intval($row->views);
    }

    wp_send_json([
        'labels' => $labels,
        'views' => $views,
        'success' => true
    ]);
}

function ot_stats_summary_ajax() {
    global $wpdb;
    $table = $wpdb->prefix . 'ot_stats';
    
    $total_views = $wpdb->get_var("SELECT COUNT(*) FROM $table");
    $today_views = $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE DATE(view_date) = CURDATE()");
    $unique_visitors = $wpdb->get_var("SELECT COUNT(DISTINCT ip_address) FROM $table WHERE view_date >= CURDATE() - INTERVAL 30 DAY");
    
    wp_send_json([
        'total_views' => intval($total_views),
        'today_views' => intval($today_views),
        'unique_visitors' => intval($unique_visitors),
        'avg_time' => '2:45' // Placeholder - nécessiterait un tracking plus avancé
    ]);
}

function ot_stats_countries_ajax() {
    global $wpdb;
    $table = $wpdb->prefix . 'ot_stats';
    
    $countries = $wpdb->get_results("
        SELECT country, COUNT(*) as views 
        FROM $table 
        WHERE country IS NOT NULL AND country != 'Inconnu'
        GROUP BY country 
        ORDER BY views DESC 
        LIMIT 10
    ");
    
    wp_send_json(['countries' => $countries]);
}

function ot_stats_hourly_ajax() {
    global $wpdb;
    $table = $wpdb->prefix . 'ot_stats';
    
    $hourly_data = array_fill(0, 24, 0);
    
    $results = $wpdb->get_results("
        SELECT HOUR(view_date) as hour, COUNT(*) as views 
        FROM $table 
        WHERE view_date >= CURDATE() - INTERVAL 7 DAY
        GROUP BY HOUR(view_date)
    ");
    
    foreach ($results as $row) {
        $hourly_data[intval($row->hour)] = intval($row->views);
    }
    
    wp_send_json(['hourly' => $hourly_data]);
}

// --- Page admin principale améliorée ---
function ot_stats_admin_page() {
    global $wpdb;
    $table = $wpdb->prefix . 'ot_stats';

    // Statistiques rapides
    $total_views = $wpdb->get_var("SELECT COUNT(*) FROM $table");
    $today_views = $wpdb->get_var("SELECT COUNT(*) FROM $table WHERE DATE(view_date) = CURDATE()");
    $unique_visitors = $wpdb->get_var("SELECT COUNT(DISTINCT ip_address) FROM $table WHERE view_date >= CURDATE() - INTERVAL 30 DAY");
    $top_countries = $wpdb->get_results("SELECT country, COUNT(*) as views FROM $table WHERE country IS NOT NULL GROUP BY country ORDER BY views DESC LIMIT 5");

    ?>
    <div class="ot-stats-wrap">
        <div class="ot-stats-header">
            <h1>📊 Tableau de Bord OT Site Stats</h1>
            <p class="ot-stats-subtitle">Analyse complète du trafic et des statistiques de votre site</p>
        </div>

        <!-- Résumé statistiques -->
        <div class="ot-stats-summary">
            <div class="ot-summary-item">
                <div class="ot-summary-number" id="total-views"><?php echo number_format($total_views); ?></div>
                <div class="ot-summary-label">Vues Totales</div>
            </div>
            <div class="ot-summary-item">
                <div class="ot-summary-number" id="today-views"><?php echo number_format($today_views); ?></div>
                <div class="ot-summary-label">Vues Aujourd'hui</div>
            </div>
            <div class="ot-summary-item">
                <div class="ot-summary-number" id="unique-visitors"><?php echo number_format($unique_visitors); ?></div>
                <div class="ot-summary-label">Visiteurs Uniques</div>
            </div>
            <div class="ot-summary-item">
                <div class="ot-summary-number" id="avg-time">2:45</div>
                <div class="ot-summary-label">Temps Moyen</div>
            </div>
        </div>

        <!-- Boutons de période -->
        <div class="ot-period-buttons">
            <button class="ot-period-btn" data-period="day">📅 Aujourd'hui</button>
            <button class="ot-period-btn active" data-period="week">📊 7 derniers jours</button>
            <button class="ot-period-btn" data-period="month">🗓️ Ce mois</button>
            <button class="ot-period-btn" data-period="year">📆 Cette année</button>
            <button class="ot-period-btn" data-period="custom">⚙️ Période personnalisée</button>
        </div>

        <!-- Période personnalisée -->
        <div id="custom-range" class="ot-custom-range" style="display: none;">
            <h3>Sélectionner une période personnalisée</h3>
            <div class="ot-date-inputs">
                <div class="ot-date-group">
                    <label for="start-date">Date de début:</label>
                    <input type="date" id="start-date">
                </div>
                <div class="ot-date-group">
                    <label for="end-date">Date de fin:</label>
                    <input type="date" id="end-date">
                </div>
                <button id="apply-custom-range" class="ot-apply-btn">Appliquer</button>
            </div>
        </div>

        <!-- Graphiques -->
        <div class="ot-stats-grid">
            <!-- Graphique principal -->
            <div class="ot-stats-card">
                <h3>🚀 Évolution du Trafic</h3>
                <div class="ot-chart-container">
                    <canvas id="mainChart"></canvas>
                </div>
            </div>

            <!-- Graphique des pays -->
            <div class="ot-stats-card">
                <h3>🌍 Répartition Géographique</h3>
                <div class="ot-chart-container">
                    <canvas id="countryChart"></canvas>
                </div>
            </div>

            <!-- Sources de trafic -->
            <div class="ot-stats-card">
                <h3>📈 Sources de Trafic</h3>
                <div class="ot-chart-container">
                    <canvas id="sourceChart"></canvas>
                </div>
            </div>

            <!-- Activité par heure -->
            <div class="ot-stats-card">
                <h3>⏰ Activité Horaire</h3>
                <div class="ot-chart-container">
                    <canvas id="timeChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Carte mondiale -->
        <div class="ot-stats-card">
            <h3>🗺️ Carte Mondiale du Trafic</h3>
            <div class="ot-map-container">
                <div id="ot-stats-map" style="width:100%; height:400px;"></div>
            </div>
        </div>

        <!-- Tableau des pays -->
        <div class="ot-stats-card">
            <h3>🏆 Classement des Pays</h3>
            <table class="ot-table-modern ot-country-table">
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Pays</th>
                        <th>Vues</th>
                        <th>Progression</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($top_countries as $index => $country): ?>
                    <tr>
                        <td><?php echo $index + 1; ?></td>
                        <td><?php echo esc_html($country->country); ?></td>
                        <td><?php echo number_format($country->views); ?></td>
                        <td>
                            <div class="ot-progress-bar">
                                <div class="ot-progress-fill" style="width: <?php echo ($country->views / $top_countries[0]->views) * 100; ?>%"></div>
                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Scripts pour la carte -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script>
        const ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
        
        // Initialisation de la carte Google
        google.charts.load("current", {packages:["geochart"]});
        google.charts.setOnLoadCallback(drawGeoChart);
        
        function drawGeoChart() {
            var data = google.visualization.arrayToDataTable([
                ["Pays", "Vues", { role: "tooltip", p: { html: true } }],
                <?php
                foreach ($top_countries as $country) {
                    if ($country->country && strtolower($country->country) !== 'inconnu') {
                        $tooltip = "<div style='padding:10px; font-weight:bold; background:#667eea; color:white; border-radius:4px;'>" 
                                 . esc_js($country->country) . "<br>" 
                                 . number_format($country->views) . " vues</div>";
                        echo "['" . esc_js($country->country) . "', {$country->views}, '$tooltip'],";
                    }
                }
                ?>
            ]);
            
            var geo = new google.visualization.GeoChart(document.getElementById("ot-stats-map"));
            geo.draw(data, {
                tooltip: { isHtml: true },
                colorAxis: { 
                    colors: ["#e3f2fd", "#667eea", "#764ba2"],
                    minValue: 0
                },
                defaultColor: "#f5f5f5",
                backgroundColor: '#fafafa',
                datalessRegionColor: '#f0f0f0',
                legend: {
                    textStyle: { color: '#666', fontSize: 12 }
                }
            });
        }
    </script>
    <?php
}

// --- Metabox pour les vues personnalisées ---
add_action('add_meta_boxes', function() {
    add_meta_box(
        'ot_manual_views',
        'Nombre de vues personnalisées (OT Site Stats)',
        'ot_manual_views_metabox',
        'post',
        'side',
        'default'
    );
});

function ot_manual_views_metabox($post) {
    global $wpdb;
    $manual = $wpdb->get_var($wpdb->prepare(
        "SELECT manual_views FROM {$wpdb->prefix}ot_stats_manual WHERE post_id = %d",
        $post->ID
    ));
    $manual = ($manual !== null) ? intval($manual) : '';
    wp_nonce_field('ot_manual_views_save', 'ot_manual_views_nonce');
    echo '<label for="ot_manual_views_field">Nombre de vues à afficher :</label>';
    echo '<input type="number" name="ot_manual_views_field" id="ot_manual_views_field" value="' . esc_attr($manual) . '" min="0" style="width:100%;" />';
    echo '<p class="description">Ce nombre sera affiché sur l\'article. Laissez vide pour utiliser la valeur par défaut.</p>';
}

add_action('save_post', function($post_id) {
    if (!isset($_POST['ot_manual_views_nonce']) || !wp_verify_nonce($_POST['ot_manual_views_nonce'], 'ot_manual_views_save')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (isset($_POST['ot_manual_views_field'])) {
        global $wpdb;
        $manual = trim($_POST['ot_manual_views_field']);
        if ($manual === '') {
            $wpdb->delete($wpdb->prefix . 'ot_stats_manual', ['post_id' => $post_id]);
        } else {
            $manual = intval($manual);
            $exists = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}ot_stats_manual WHERE post_id = %d", $post_id));
            if ($exists) {
                $wpdb->update($wpdb->prefix . 'ot_stats_manual', ['manual_views' => $manual], ['post_id' => $post_id]);
            } else {
                $wpdb->insert($wpdb->prefix . 'ot_stats_manual', ['post_id' => $post_id, 'manual_views' => $manual]);
            }
        }
    }
});

function ot_get_display_views($post_id) {
    global $wpdb;
    $manual = $wpdb->get_var($wpdb->prepare("SELECT manual_views FROM {$wpdb->prefix}ot_stats_manual WHERE post_id = %d", $post_id));
    if ($manual !== null) {
        return intval($manual);
    }
    $default = get_option('ot_stats_default_views', 0);
    return intval($default);
}
?>
