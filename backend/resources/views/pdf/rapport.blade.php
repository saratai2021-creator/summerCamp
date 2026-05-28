<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">

    <title>Rapport pédagogique</title>

    <style>
        body {
            font-family: DejaVu Sans;
            margin: 0;
            padding: 0;
            color: #1e293b;
            background: #f8fafc;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .header {
            background: linear-gradient(135deg, #0f172a, #1e3a8a);
            color: white;
            padding: 35px 45px;
        }

        .school-name {
            font-size: 34px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .school-subtitle {
            font-size: 15px;
            opacity: 0.9;
        }

        /* =====================================================
           CONTAINER
        ===================================================== */

        .container {
            padding: 40px;
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
            color: #0f172a;
            font-size: 30px;
        }

        .report-title p {
            margin-top: 10px;
            color: #64748b;
            font-size: 14px;
        }

        /* =====================================================
           INFO GRID
        ===================================================== */

        .info-grid {
            width: 100%;
            margin-bottom: 30px;
        }

        .info-box {
            width: 48%;
            display: inline-block;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 18px;
            margin-bottom: 15px;
            vertical-align: top;
        }

        .label {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 8px;
        }

        .value {
            font-size: 18px;
            font-weight: bold;
            color: #0f172a;
        }

        /* =====================================================
           PRESENCE CARD
        ===================================================== */

        .presence-card {
            background: linear-gradient(135deg, #38bdf8, #2563eb);
            color: white;
            border-radius: 18px;
            padding: 25px;
            margin-bottom: 35px;
            text-align: center;
        }

        .presence-card h2 {
            margin: 0;
            font-size: 20px;
        }

        .presence-value {
            font-size: 52px;
            font-weight: bold;
            margin-top: 10px;
        }

        /* =====================================================
           SECTIONS
        ===================================================== */

        .section {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 22px;
        }

        .section-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #2563eb;
        }

        .section-content {
            font-size: 15px;
            line-height: 1.8;
            color: #334155;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #cbd5e1;
            text-align: center;
            color: #64748b;
            font-size: 13px;
        }

        .signature {
            margin-top: 50px;
            text-align: right;
        }

        .signature-box {
            display: inline-block;
            text-align: center;
        }

        .signature-line {
            width: 220px;
            border-top: 1px solid #1e293b;
            margin-bottom: 8px;
        }
    </style>

</head>

<body>

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div class="header">

        <div class="school-name">
            Elite Coders Academy
        </div>

        <div class="school-subtitle">
            Rapport pédagogique officiel
        </div>

    </div>

    <!-- =====================================================
         CONTENT
    ====================================================== -->

    <div class="container">

        <!-- TITLE -->

        <div class="report-title">

            <h1>Rapport pédagogique</h1>

            <p>
                Suivi académique et pédagogique de l'étudiant
            </p>

        </div>

        <!-- INFO -->

        <div class="info-grid">

            <div class="info-box">

                <div class="label">Étudiant</div>

                <div class="value">
                    {{ $rapport->etudiant->prenom }}
                    {{ $rapport->etudiant->nom }}
                </div>

            </div>

            <div class="info-box">

                <div class="label">Atelier</div>

                <div class="value">
                    {{ $rapport->atelier->titre }}
                </div>

            </div>

            <div class="info-box">

                <div class="label">Date début</div>

                <div class="value">
                    {{ $rapport->date_debut }}
                </div>

            </div>

            <div class="info-box">

                <div class="label">Date fin</div>

                <div class="value">
                    {{ $rapport->date_fin }}
                </div>

            </div>

        </div>

        <!-- PRESENCE -->

        <div class="presence-card">

            <h2>Taux de présence</h2>

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

        <!-- SIGNATURE -->

        <div class="signature">

            <div class="signature-box">

                <div class="signature-line"></div>

                <strong>Signature du formateur</strong>

            </div>

        </div>

        <!-- FOOTER -->

        <div class="footer">

            Elite Coders Academy • Rapport généré automatiquement •
            {{ now()->format('d/m/Y H:i') }}

        </div>

    </div>

</body>

</html>
