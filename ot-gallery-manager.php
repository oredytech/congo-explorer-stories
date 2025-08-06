
<?php
/*
Plugin Name: OT Gallery Manager
Description: Plugin de gestion de galerie pour le site Visit Congo - permet d'ajouter et gérer des médias pour la galerie frontend.
Author: Oredy Technologies
Version: 1.0
*/

if (!defined('ABSPATH')) exit;

// --- Activation - création des tables ---
register_activation_hook(__FILE__, function () {
    global $wpdb;
    
    // Table pour les réactions de galerie
    $table_reactions = $wpdb->prefix . 'ot_gallery_reactions';
    $charset = $wpdb->get_charset_collate();
    $sql_reactions = "CREATE TABLE IF NOT EXISTS $table_reactions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        media_id BIGINT NOT NULL,
        reaction_type ENUM('like', 'love', 'dislike') NOT NULL,
        ip_address VARCHAR(100),
        user_agent TEXT,
        date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_reaction (media_id, ip_address, reaction_type)
    ) $charset;";
    
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql_reactions);
});

// --- REST API pour les réactions ---
add_action('rest_api_init', function () {
    register_rest_route('ot-gallery/v1', '/reaction/(?P<id>\\d+)', [
        'methods' => 'POST',
        'callback' => 'ot_gallery_add_reaction',
        'permission_callback' => '__return_true'
    ]);
    
    register_rest_route('ot-gallery/v1', '/reactions/(?P<id>\\d+)', [
        'methods' => 'GET',
        'callback' => 'ot_gallery_get_reactions',
        'permission_callback' => '__return_true'
    ]);
});

function ot_gallery_add_reaction($request) {
    global $wpdb;
    $media_id = intval($request['id']);
    $reaction_type = sanitize_text_field($request->get_param('reaction_type'));
    $ip = $_SERVER['REMOTE_ADDR'];
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    
    if (!in_array($reaction_type, ['like', 'love', 'dislike'])) {
        return new WP_Error('invalid_reaction', 'Type de réaction invalide', ['status' => 400]);
    }
    
    $table = $wpdb->prefix . 'ot_gallery_reactions';
    
    // Vérifier si la réaction existe déjà
    $existing = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM $table WHERE media_id = %d AND ip_address = %s AND reaction_type = %s",
        $media_id, $ip, $reaction_type
    ));
    
    if ($existing) {
        return ['success' => false, 'message' => 'Réaction déjà enregistrée'];
    }
    
    $result = $wpdb->insert($table, [
        'media_id' => $media_id,
        'reaction_type' => $reaction_type,
        'ip_address' => $ip,
        'user_agent' => $user_agent
    ]);
    
    if ($result) {
        // Mettre à jour les métadonnées du média
        ot_update_media_reaction_count($media_id);
        return ['success' => true, 'message' => 'Réaction enregistrée'];
    }
    
    return ['success' => false, 'message' => 'Erreur lors de l\'enregistrement'];
}

function ot_gallery_get_reactions($request) {
    global $wpdb;
    $media_id = intval($request['id']);
    $table = $wpdb->prefix . 'ot_gallery_reactions';
    
    $reactions = $wpdb->get_results($wpdb->prepare(
        "SELECT reaction_type, COUNT(*) as count FROM $table WHERE media_id = %d GROUP BY reaction_type",
        $media_id
    ));
    
    $result = ['like' => 0, 'love' => 0, 'dislike' => 0];
    foreach ($reactions as $reaction) {
        $result[$reaction->reaction_type] = intval($reaction->count);
    }
    
    return $result;
}

function ot_update_media_reaction_count($media_id) {
    global $wpdb;
    $table = $wpdb->prefix . 'ot_gallery_reactions';
    
    $reactions = $wpdb->get_results($wpdb->prepare(
        "SELECT reaction_type, COUNT(*) as count FROM $table WHERE media_id = %d GROUP BY reaction_type",
        $media_id
    ));
    
    $counts = ['like' => 0, 'love' => 0, 'dislike' => 0];
    foreach ($reactions as $reaction) {
        $counts[$reaction->reaction_type] = intval($reaction->count);
    }
    
    update_post_meta($media_id, 'gallery_reactions', $counts);
}

// --- Menu d'administration ---
add_action('admin_menu', function () {
    add_menu_page(
        'OT Gallery Manager',
        'Galerie Manager',
        'manage_options',
        'ot-gallery-manager',
        'ot_gallery_admin_page',
        'dashicons-format-gallery',
        25
    );
    
    add_submenu_page(
        'ot-gallery-manager',
        'Ajouter à la galerie',
        'Ajouter média',
        'manage_options',
        'ot-gallery-add',
        'ot_gallery_add_page'
    );
});

// --- Page principale d'administration ---
function ot_gallery_admin_page() {
    $gallery_items = get_posts([
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'meta_query' => [
            [
                'key' => 'gallery_enabled',
                'value' => '1',
                'compare' => '='
            ]
        ],
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'DESC'
    ]);
    
    ?>
    <div class="wrap">
        <h1>Gestionnaire de Galerie OT</h1>
        
        <div class="notice notice-info">
            <p><strong>Info :</strong> Cette galerie est synchronisée avec le site frontend Visit Congo. Les modifications apparaîtront automatiquement sur le site.</p>
        </div>
        
        <h2>Éléments dans la galerie (<?php echo count($gallery_items); ?>)</h2>
        
        <?php if (empty($gallery_items)): ?>
            <p>Aucun élément dans la galerie. <a href="<?php echo admin_url('admin.php?page=ot-gallery-add'); ?>">Ajouter un média</a></p>
        <?php else: ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width: 60px;">Aperçu</th>
                        <th>Titre</th>
                        <th>Légende galerie</th>
                        <th>Type</th>
                        <th>Réactions</th>
                        <th>Date ajout</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($gallery_items as $item): 
                        $reactions = get_post_meta($item->ID, 'gallery_reactions', true) ?: ['like' => 0, 'love' => 0, 'dislike' => 0];
                        $gallery_caption = get_post_meta($item->ID, 'gallery_caption', true);
                        $is_video = strpos($item->post_mime_type, 'video/') === 0;
                    ?>
                        <tr>
                            <td>
                                <?php if ($is_video): ?>
                                    <span class="dashicons dashicons-format-video" style="font-size: 32px; color: #666;"></span>
                                <?php else: ?>
                                    <?php echo wp_get_attachment_image($item->ID, 'thumbnail', false, ['style' => 'max-width: 50px; height: auto;']); ?>
                                <?php endif; ?>
                            </td>
                            <td><strong><?php echo esc_html($item->post_title); ?></strong></td>
                            <td><?php echo esc_html($gallery_caption ?: $item->post_excerpt); ?></td>
                            <td><?php echo $is_video ? 'Vidéo' : 'Image'; ?></td>
                            <td>
                                👍 <?php echo $reactions['like']; ?> | 
                                ❤️ <?php echo $reactions['love']; ?> | 
                                👎 <?php echo $reactions['dislike']; ?>
                            </td>
                            <td><?php echo get_the_date('d/m/Y H:i', $item); ?></td>
                            <td>
                                <a href="<?php echo get_edit_post_link($item->ID); ?>" class="button button-small">Modifier</a>
                                <a href="<?php echo admin_url('admin.php?page=ot-gallery-manager&action=remove&media_id=' . $item->ID . '&_wpnonce=' . wp_create_nonce('remove_from_gallery')); ?>" 
                                   class="button button-small" 
                                   onclick="return confirm('Retirer cet élément de la galerie ?');">Retirer</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

// --- Page d'ajout de média ---
function ot_gallery_add_page() {
    $message = '';
    
    if ($_POST && wp_verify_nonce($_POST['_wpnonce'], 'add_to_gallery')) {
        $media_ids = array_map('intval', $_POST['media_ids'] ?? []);
        $gallery_caption = sanitize_textarea_field($_POST['gallery_caption'] ?? '');
        
        foreach ($media_ids as $media_id) {
            if ($media_id > 0) {
                update_post_meta($media_id, 'gallery_enabled', '1');
                if ($gallery_caption) {
                    update_post_meta($media_id, 'gallery_caption', $gallery_caption);
                }
            }
        }
        
        $message = '<div class="notice notice-success"><p>Média(s) ajouté(s) à la galerie avec succès !</p></div>';
    }
    
    // Récupérer les médias non encore dans la galerie
    $available_media = get_posts([
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'post_mime_type' => 'image,video',
        'meta_query' => [
            'relation' => 'OR',
            [
                'key' => 'gallery_enabled',
                'compare' => 'NOT EXISTS'
            ],
            [
                'key' => 'gallery_enabled',
                'value' => '1',
                'compare' => '!='
            ]
        ],
        'posts_per_page' => 50,
        'orderby' => 'date',
        'order' => 'DESC'
    ]);
    
    ?>
    <div class="wrap">
        <h1>Ajouter des médias à la galerie</h1>
        
        <?php echo $message; ?>
        
        <?php if (empty($available_media)): ?>
            <div class="notice notice-warning">
                <p>Aucun média disponible. Tous les médias sont déjà dans la galerie ou vous devez d'abord uploader des médias dans la médiathèque.</p>
            </div>
            <p><a href="<?php echo admin_url('media-new.php'); ?>" class="button button-primary">Ajouter un nouveau média</a></p>
        <?php else: ?>
            <form method="post" action="">
                <?php wp_nonce_field('add_to_gallery'); ?>
                
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th style="width: 50px;">
                                <input type="checkbox" id="select-all" />
                            </th>
                            <th style="width: 60px;">Aperçu</th>
                            <th>Titre</th>
                            <th>Type</th>
                            <th>Date upload</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($available_media as $media): 
                            $is_video = strpos($media->post_mime_type, 'video/') === 0;
                        ?>
                            <tr>
                                <td>
                                    <input type="checkbox" name="media_ids[]" value="<?php echo $media->ID; ?>" class="media-checkbox" />
                                </td>
                                <td>
                                    <?php if ($is_video): ?>
                                        <span class="dashicons dashicons-format-video" style="font-size: 32px; color: #666;"></span>
                                    <?php else: ?>
                                        <?php echo wp_get_attachment_image($media->ID, 'thumbnail', false, ['style' => 'max-width: 50px; height: auto;']); ?>
                                    <?php endif; ?>
                                </td>
                                <td><strong><?php echo esc_html($media->post_title); ?></strong></td>
                                <td><?php echo $is_video ? 'Vidéo' : 'Image'; ?></td>
                                <td><?php echo get_the_date('d/m/Y H:i', $media); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                
                <br>
                
                <h3>Légende personnalisée pour la galerie (optionnelle)</h3>
                <textarea name="gallery_caption" rows="3" cols="50" placeholder="Légende qui apparaîtra sur le site de la galerie..." class="large-text"></textarea>
                
                <p class="submit">
                    <input type="submit" class="button button-primary" value="Ajouter les médias sélectionnés à la galerie" />
                </p>
            </form>
            
            <script>
                document.getElementById('select-all').addEventListener('change', function() {
                    const checkboxes = document.querySelectorAll('.media-checkbox');
                    checkboxes.forEach(cb => cb.checked = this.checked);
                });
            </script>
        <?php endif; ?>
    </div>
    <?php
}

// --- Gestion des actions ---
add_action('admin_init', function() {
    if (isset($_GET['action']) && $_GET['action'] === 'remove' && isset($_GET['media_id'])) {
        if (wp_verify_nonce($_GET['_wpnonce'], 'remove_from_gallery')) {
            $media_id = intval($_GET['media_id']);
            delete_post_meta($media_id, 'gallery_enabled');
            delete_post_meta($media_id, 'gallery_caption');
            
            wp_redirect(admin_url('admin.php?page=ot-gallery-manager&message=removed'));
            exit;
        }
    }
});

// --- Ajouter une métabox dans l'éditeur de médias ---
add_action('add_meta_boxes', function() {
    add_meta_box(
        'ot_gallery_options',
        'Options de galerie Visit Congo',
        'ot_gallery_metabox',
        'attachment',
        'side',
        'default'
    );
});

function ot_gallery_metabox($post) {
    $gallery_enabled = get_post_meta($post->ID, 'gallery_enabled', true);
    $gallery_caption = get_post_meta($post->ID, 'gallery_caption', true);
    
    wp_nonce_field('ot_gallery_metabox_save', 'ot_gallery_nonce');
    ?>
    <p>
        <label>
            <input type="checkbox" name="gallery_enabled" value="1" <?php checked($gallery_enabled, '1'); ?> />
            Afficher dans la galerie Visit Congo
        </label>
    </p>
    
    <p>
        <label for="gallery_caption">Légende galerie :</label><br>
        <textarea name="gallery_caption" id="gallery_caption" rows="3" style="width: 100%;" placeholder="Légende personnalisée pour la galerie..."><?php echo esc_textarea($gallery_caption); ?></textarea>
    </p>
    <?php
}

add_action('edit_attachment', function($post_id) {
    if (!isset($_POST['ot_gallery_nonce']) || !wp_verify_nonce($_POST['ot_gallery_nonce'], 'ot_gallery_metabox_save')) {
        return;
    }
    
    if (isset($_POST['gallery_enabled'])) {
        update_post_meta($post_id, 'gallery_enabled', '1');
    } else {
        delete_post_meta($post_id, 'gallery_enabled');
    }
    
    if (isset($_POST['gallery_caption'])) {
        $caption = sanitize_textarea_field($_POST['gallery_caption']);
        if ($caption) {
            update_post_meta($post_id, 'gallery_caption', $caption);
        } else {
            delete_post_meta($post_id, 'gallery_caption');
        }
    }
});

// --- Modifier l'API WordPress pour inclure les métadonnées de galerie ---
add_action('rest_api_init', function() {
    register_rest_field('attachment', 'meta', [
        'get_callback' => function($post) {
            $gallery_enabled = get_post_meta($post['id'], 'gallery_enabled', true);
            $gallery_caption = get_post_meta($post['id'], 'gallery_caption', true);
            $gallery_reactions = get_post_meta($post['id'], 'gallery_reactions', true);
            
            return [
                'gallery_enabled' => $gallery_enabled === '1',
                'gallery_caption' => $gallery_caption ?: '',
                'gallery_reactions' => $gallery_reactions ?: ['like' => 0, 'love' => 0, 'dislike' => 0]
            ];
        },
        'update_callback' => null,
        'schema' => null,
    ]);
});
?>
