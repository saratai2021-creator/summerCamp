<!DOCTYPE html>

<html lang="fr">

<head>

    <meta charset="UTF-8">

    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 13px;
            color: #1e293b;
            margin: 0;
            padding: 0;
            line-height: 1.7;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .header {
            background: #081120;
            padding: 28px 40px;
            color: white;
            border-bottom: 4px solid #38bdf8;
        }

        .school {
            font-size: 26px;
            font-weight: bold;
        }

        .subtitle {
            margin-top: 6px;
            color: #cbd5e1;
            font-size: 12px;
        }

        /* =====================================================
           CONTAINER
        ===================================================== */

        .container {
            padding: 35px 40px;
        }

        /* =====================================================
           TITLE
        ===================================================== */

        .report-title {
            text-align: center;
            margin-bottom: 35px;
        }

        .report-title h1 {
            margin: 0;
            font-size: 24px;
            color: #081120;
        }

        .report-title p {
            margin-top: 8px;
            color: #64748b;
            font-size: 12px;
        }

        /* =====================================================
           INFO LINE
        ===================================================== */

        .info-line {
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
        }

        .label {
            font-weight: bold;
            color: #081120;
            display: inline-block;
            width: 180px;
            font-size: 14px;
        }

        .value {
            color: #334155;
        }

        /* =====================================================
           SECTION
        ===================================================== */

        .section {
            margin-top: 28px;
        }

        .section-title {
            font-size: 17px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 10px;
            border-left: 4px solid #38bdf8;
            padding-left: 10px;
        }

        .section-content {
            color: #334155;
            text-align: justify;
        }

        /* =====================================================
           PRESENCE BOX
        ===================================================== */

        .presence-box {
            margin-top: 25px;
            background: #eff6ff;
            border-left: 5px solid #38bdf8;
            padding: 18px;
        }

        .presence-title {
            font-size: 14px;
            color: #2563eb;
            font-weight: bold;
        }

        .presence-value {
            font-size: 30px;
            font-weight: bold;
            color: #081120;
            margin-top: 5px;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
            position: fixed;
            bottom: 0;
            left: 40px;
            right: 40px;

            border-top: 1px solid #cbd5e1;

            padding-top: 10px;

            text-align: center;

            font-size: 11px;

            color: #64748b;
        }
    </style>

</head>

<body>

    <!-- HEADER -->

    <div class="header">

        <div class="school">
            Elite Coders Academy
        </div>

        <div class="subtitle">
            Rapport pédagogique officiel
        </div>

    </div>

    <!-- CONTENT -->

    <div class="container">

        <!-- TITLE -->

        <div class="report-title">

            <h1>Rapport pédagogique</h1>

            <p>
                Suivi académique et pédagogique de l'étudiant
            </p>

        </div>

        <!-- INFORMATIONS -->

        <div class="info-line">
            <span class="label">Étudiant :</span>

            <span class="value">
                {{ $rapport->etudiant->prenom }}
                {{ $rapport->etudiant->nom }}
            </span>
        </div>

        <div class="info-line">
            <span class="label">Atelier :</span>

            <span class="value">
                {{ $rapport->atelier->titre }}
            </span>
        </div>

        <div class="info-line">
            <span class="label">Période :</span>

            <span class="value">
                {{ $rapport->date_debut }}
                →
                {{ $rapport->date_fin }}
            </span>
        </div>

        <!-- PRESENCE -->

        <div class="presence-box">

            <div class="presence-title">
                Taux de présence
            </div>

            <div class="presence-value">
                {{ $rapport->taux_presence }}%
            </div>

        </div>

        <!-- APPRECIATION -->

        <div class="section">

            <div class="section-title">
                Appréciation générale
            </div>

            <div class="section-content">
                {{ $rapport->appreciation_generale }}
            </div>

        </div>

        <!-- POINTS FORTS -->

        <div class="section">

            <div class="section-title">
                Points forts
            </div>

            <div class="section-content">
                {{ $rapport->points_forts }}
            </div>

        </div>

        <!-- AMELIORATION -->

        <div class="section">

            <div class="section-title">
                Points à améliorer
            </div>

            <div class="section-content">
                {{ $rapport->points_a_ameliorer }}
            </div>

        </div>

        <!-- RECOMMANDATIONS -->

        <div class="section">

            <div class="section-title">
                Recommandations pédagogiques
            </div>

            <div class="section-content">
                {{ $rapport->recommandations }}
            </div>

        </div>

    </div>

    <!-- FOOTER -->

    <div class="footer">

        <strong>Elite Coders Academy</strong>
        © {{ date('Y') }}

        ||

        elitecodersacademy@gmail.com

        ||

        0708359267

    </div>

</body>

</html>
