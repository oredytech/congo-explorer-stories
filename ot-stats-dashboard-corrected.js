
// JavaScript amélioré pour le tableau de bord OT Site Stats
document.addEventListener("DOMContentLoaded", function() {
    let mainChart, countryChart, sourceChart, timeChart;
    
    // Configuration des couleurs
    const colors = {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };

    // Variables globales pour AJAX
    const ajaxurl = otStats.ajaxurl;
    const nonce = otStats.nonce;

    // Initialisation
    initializeCharts();
    initializeEventListeners();
    loadDashboardData();
    addAnimations();

    function initializeCharts() {
        // Graphique principal des vues
        const mainCtx = document.getElementById('mainChart');
        if (mainCtx) {
            mainChart = new Chart(mainCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Vues',
                        data: [],
                        borderColor: colors.primary,
                        backgroundColor: colors.primary + '20',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }]
                },
                options: getChartOptions('Évolution des vues')
            });
        }

        // Graphique en secteurs pour les pays
        const countryCtx = document.getElementById('countryChart');
        if (countryCtx) {
            countryChart = new Chart(countryCtx, {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            colors.primary,
                            colors.secondary,
                            colors.success,
                            colors.warning,
                            colors.danger,
                            '#8b5cf6',
                            '#06b6d4',
                            '#84cc16'
                        ],
                        borderWidth: 0,
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        title: {
                            display: true,
                            text: 'Répartition par pays',
                            font: { size: 16, weight: 'bold' }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1000
                    }
                }
            });
        }

        // Graphique des sources de trafic
        const sourceCtx = document.getElementById('sourceChart');
        if (sourceCtx) {
            sourceChart = new Chart(sourceCtx, {
                type: 'bar',
                data: {
                    labels: ['Direct', 'Google', 'Facebook', 'Twitter', 'Autres'],
                    datasets: [{
                        label: 'Visites',
                        data: [45, 30, 15, 7, 3],
                        backgroundColor: [
                            colors.primary,
                            colors.success,
                            '#3b82f6',
                            '#1d9bf0',
                            colors.warning
                        ],
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    ...getChartOptions('Sources de trafic'),
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Graphique horaire
        const timeCtx = document.getElementById('timeChart');
        if (timeCtx) {
            timeChart = new Chart(timeCtx, {
                type: 'bar',
                data: {
                    labels: Array.from({length: 24}, (_, i) => i + 'h'),
                    datasets: [{
                        label: 'Vues par heure',
                        data: [],
                        backgroundColor: colors.primary + '80',
                        borderColor: colors.primary,
                        borderWidth: 2,
                        borderRadius: 4
                    }]
                },
                options: getChartOptions('Activité par heure')
            });
        }
    }

    function getChartOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#2c3e50'
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        };
    }

    function initializeEventListeners() {
        // Boutons de période
        document.querySelectorAll('.ot-period-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active des autres boutons
                document.querySelectorAll('.ot-period-btn').forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const period = this.getAttribute('data-period');
                console.log('Période sélectionnée:', period);
                
                if (period === 'custom') {
                    document.getElementById('custom-range').style.display = 'block';
                } else {
                    document.getElementById('custom-range').style.display = 'none';
                    updateChartData(period);
                }
            });
        });

        // Bouton d'application de période personnalisée
        const applyBtn = document.getElementById('apply-custom-range');
        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                const startDate = document.getElementById('start-date').value;
                const endDate = document.getElementById('end-date').value;
                
                if (!startDate || !endDate) {
                    alert('Veuillez sélectionner les deux dates');
                    return;
                }
                
                if (new Date(startDate) > new Date(endDate)) {
                    alert('La date de début doit être antérieure à la date de fin');
                    return;
                }
                
                updateChartData('custom', startDate, endDate);
            });
        }

        // Mise à jour automatique toutes les 5 minutes
        setInterval(loadDashboardData, 300000);
    }

    function updateChartData(period, startDate = null, endDate = null) {
        console.log('Mise à jour des données pour:', period, startDate, endDate);
        showLoading();
        
        let url = `${ajaxurl}?action=ot_stats_range&period=${period}&nonce=${nonce}`;
        if (period === 'custom' && startDate && endDate) {
            url += `&start_date=${startDate}&end_date=${endDate}`;
        }

        console.log('URL AJAX:', url);

        fetch(url)
            .then(response => {
                console.log('Réponse reçue:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Données reçues:', data);
                if (data.success) {
                    updateMainChart(data);
                    updateSummaryStats(data);
                } else {
                    console.error('Erreur dans la réponse:', data);
                }
                hideLoading();
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données:', error);
                hideLoading();
                alert('Erreur lors du chargement des données. Vérifiez la console pour plus de détails.');
            });
    }

    function updateMainChart(data) {
        if (mainChart && data.labels && data.views) {
            mainChart.data.labels = data.labels;
            mainChart.data.datasets[0].data = data.views;
            mainChart.update('active');
            console.log('Graphique principal mis à jour');
        }
    }

    function loadDashboardData() {
        console.log('Chargement des données du dashboard');
        
        // Charger les statistiques générales
        fetch(`${ajaxurl}?action=ot_stats_summary&nonce=${nonce}`)
            .then(response => response.json())
            .then(data => {
                console.log('Statistiques générales:', data);
                updateSummaryCards(data);
            })
            .catch(error => console.error('Erreur stats générales:', error));

        // Charger les données des pays
        fetch(`${ajaxurl}?action=ot_stats_countries&nonce=${nonce}`)
            .then(response => response.json())
            .then(data => {
                console.log('Données pays:', data);
                updateCountryChart(data);
                updateCountryTable(data);
            })
            .catch(error => console.error('Erreur données pays:', error));

        // Charger les données horaires
        fetch(`${ajaxurl}?action=ot_stats_hourly&nonce=${nonce}`)
            .then(response => response.json())
            .then(data => {
                console.log('Données horaires:', data);
                updateTimeChart(data);
            })
            .catch(error => console.error('Erreur données horaires:', error));
    }

    function updateSummaryCards(data) {
        const elements = {
            'total-views': data.total_views || 0,
            'today-views': data.today_views || 0,
            'unique-visitors': data.unique_visitors || 0,
            'avg-time': data.avg_time || '0:00'
        };

        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (id === 'avg-time') {
                    element.textContent = elements[id];
                } else {
                    animateNumber(element, elements[id]);
                }
            }
        });
    }

    function updateCountryChart(data) {
        if (countryChart && data.countries && data.countries.length > 0) {
            const labels = data.countries.map(item => item.country);
            const values = data.countries.map(item => item.views);
            
            countryChart.data.labels = labels;
            countryChart.data.datasets[0].data = values;
            countryChart.update();
            console.log('Graphique pays mis à jour');
        }
    }

    function updateCountryTable(data) {
        const tbody = document.querySelector('.ot-country-table tbody');
        if (tbody && data.countries) {
            // Ne pas vider le tableau s'il y a déjà du contenu statique
            console.log('Mise à jour du tableau des pays');
        }
    }

    function updateTimeChart(data) {
        if (timeChart && data.hourly) {
            timeChart.data.datasets[0].data = data.hourly;
            timeChart.update();
            console.log('Graphique horaire mis à jour');
        }
    }

    function showLoading() {
        const loadingElements = document.querySelectorAll('.ot-chart-container');
        loadingElements.forEach(el => {
            if (!el.querySelector('.ot-loading')) {
                const loading = document.createElement('div');
                loading.className = 'ot-loading';
                loading.innerHTML = '<div class="ot-spinner"></div>';
                el.appendChild(loading);
            }
        });
    }

    function hideLoading() {
        document.querySelectorAll('.ot-loading').forEach(el => el.remove());
    }

    function animateNumber(element, targetValue) {
        const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const duration = 1000;
        const startTime = Date.now();

        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    function addAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ot-animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.ot-stats-card').forEach((card, index) => {
            card.classList.add(`ot-animate-delay-${index % 3 + 1}`);
            observer.observe(card);
        });
    }

    // Initialisation par défaut avec la semaine
    setTimeout(() => {
        console.log('Initialisation par défaut');
        updateChartData('week');
    }, 1000);
});
