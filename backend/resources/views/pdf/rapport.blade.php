{{-- <!DOCTYPE html>

<html lang="fr">

<head>

    <meta charset="UTF-8">

    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 13px;
            color: #1e293b;
            margin: 40px;
            line-height: 1.7;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .header {
            border-bottom: 3px solid #38bdf8;
            padding-bottom: 14px;
            margin-bottom: 30px;
        }

        .school {
            font-size: 28px;
            font-weight: bold;
            color: #0f172a;
        }

        .subtitle {
            font-size: 20px;
            font-weight: bold;
            color: #2563eb;
            margin-top: 4px;
        }

        /* =====================================================
           TITLES
        ===================================================== */

        h3 {
            font-size: 17px;
            font-weight: bold;
            margin-top: 28px;
            margin-bottom: 12px;
            color: #0f172a;
        }

        /* =====================================================
           TABLE
        ===================================================== */

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }

        table th {
            background: #eff6ff;
            color: #0f172a;
            font-weight: bold;
        }

        table th,
        table td {
            border: 1px solid #dbeafe;
            padding: 11px;
            text-align: left;
        }

        table td {
            background: #ffffff;
        }

        /* =====================================================
           TEXT SECTION
        ===================================================== */

        .section {
            margin-bottom: 22px;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 8px;
        }

        .section-content {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 14px;
            border-radius: 6px;
            color: #334155;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
            position: fixed;
            bottom: 0;
            left: 40px;
            right: 40px;

            border-top: 2px solid #38bdf8;

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
            Rapport pédagogique
        </div>

    </div>

    <!-- INFORMATIONS -->

    <h3>Informations Générales</h3>

    <table>

        <tr>
            <th width="30%">Étudiant</th>

            <td>
                {{ $rapport->etudiant->prenom }}
                {{ $rapport->etudiant->nom }}
            </td>
        </tr>

        <tr>
            <th>Atelier</th>

            <td>
                {{ $rapport->atelier->titre }}
            </td>
        </tr>

        <tr>
            <th>Période</th>

            <td>
                {{ $rapport->date_debut }}
                →
                {{ $rapport->date_fin }}
            </td>
        </tr>

    </table>

    <!-- PRESENCE -->

    <h3>Présence</h3>

    <table>

        <tr>
            <th>Total séances</th>

            <th>Séances assistées</th>

            <th>Taux présence</th>
        </tr>

        <tr>
            <td>{{ $rapport->total_seances }}</td>

            <td>{{ $rapport->seances_assistees }}</td>

            <td>{{ $rapport->taux_presence }}%</td>
        </tr>

    </table>

    <!-- PERFORMANCE -->

    <h3>Performance académique</h3>

    <table>

        <tr>
            <th>Moyenne exercices</th>

            <th>Moyenne examens</th>
        </tr>

        <tr>
            <td>{{ $rapport->moyenne_exercices }}</td>

            <td>{{ $rapport->moyenne_examen }}</td>
        </tr>

    </table>

    <!-- MODULES -->

    <h3>Modules de formation</h3>

    <table>

        <tr>
            <th width="50%">Modules terminés</th>

            <th width="50%">Modules en cours</th>
        </tr>

        @php
            $termines = preg_split('/[\r\n;]+/', $rapport->modules_termines ?? '');
            $encours = preg_split('/[\r\n;]+/', $rapport->modules_en_cours ?? '');

            $max = max(count($termines), count($encours));
        @endphp

        @for ($i = 0; $i < $max; $i++)
            <tr>

                <td>
                    {{ isset($termines[$i]) ? trim($termines[$i]) : '' }}
                </td>

                <td>
                    {{ isset($encours[$i]) ? trim($encours[$i]) : '' }}
                </td>

            </tr>
        @endfor

    </table>

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

</html> --}}



<!DOCTYPE html>

<html>

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 13px;
            color: #2c2c2c;
        }

        /* HEADER */
        .header {
            border-bottom: 2px solid #030e5d;
            margin-bottom: 20px;
        }

        .title {
            font-size: 22px;
            font-weight: bold;
            color: #07053b;
        }

        /* SECTIONS */

        .section {
            margin-top: 18px;
            page-break-inside: avoid;

        }

        .section-title {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 5px;
            text-transform: capitalize;
        }

        /* TABLE */

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        th {

            font-weight: bold;
        }

        td {
            background: #fafafa;
        }

        td,
        th {
            border: 1px solid #ddd;
            padding: 7px;
        }



        /* FOOTER */

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 2px solid #030e5d;
            text-align: center;
            font-size: 11px;
            padding-top: 5px;
        }
    </style>
</head>

<body>
    <!-- HEADER -->
    <div class="header">
        <table class="header-table">
            <tr>
                <td>
                    <div class="title">
                        Elite Coders Academy<br>
                        Rapport pédagogique
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- INFORMATIONS -->

    <div class="section">

        <div class="section-title">
            Informations générales
        </div>

        <table>

            <tr>
                <td><strong>Étudiant</strong></td>

                <td>
                    {{ $rapport->etudiant->prenom }}
                    {{ $rapport->etudiant->nom }}
                </td>
            </tr>

            <tr>
                <td><strong>Période</strong></td>

                <td>
                    {{ $rapport->date_debut }}
                    →
                    {{ $rapport->date_fin }}
                </td>
            </tr>

        </table>

    </div>

    <!-- PRESENCE -->

    <div class="section">

        <div class="section-title">
            Présence
        </div>

        <table>

            <tr>
                <th>Total séances</th>
                <th>Séances assistées</th>
                <th>Taux présence</th>
            </tr>

            <tr>
                <td>{{ $rapport->total_seances }}</td>

                <td>{{ $rapport->seances_assistees }}</td>

                <td>{{ number_format($rapport->taux_presence, 2) }} %</td>
            </tr>

        </table>

    </div>

    <!-- PERFORMANCE -->

    <div class="section">

        <div class="section-title">
            Performance Académique
        </div>

        <table>

            <tr>
                <th>Moyenne exercices</th>
                <th>Moyenne examens</th>
            </tr>

            <tr>
                <td>{{ $rapport->moyenne_exercices }}</td>

                <td>{{ $rapport->moyenne_examen }}</td>
            </tr>

        </table>

    </div>

    <!-- MODULES -->

    <div class="section">

        <div class="section-title">
            Modules de formation
        </div>

        <table>

            <tr>
                <th width="50%">Modules terminés</th>

                <th width="50%">Modules en cours</th>
            </tr>

            @php
                $termines = preg_split('/[\r\n;]+/', $rapport->modules_termines ?? '');

                $encours = preg_split('/[\r\n;]+/', $rapport->modules_en_cours ?? '');

                $max = max(count($termines), count($encours));
            @endphp

            @for ($i = 0; $i < $max; $i++)
                <tr>

                    <td>
                        {{ isset($termines[$i]) && trim($termines[$i]) != '' ? trim($termines[$i]) : '' }}
                    </td>

                    <td>
                        {{ isset($encours[$i]) && trim($encours[$i]) != '' ? trim($encours[$i]) : '' }}
                    </td>

                </tr>
            @endfor

        </table>

    </div>

    <!-- COMMENTAIRES -->

    <div class="section">

        <div class="section-title">
            Appréciation générale
        </div>

        <p>{{ $rapport->appreciation_generale }}</p>

    </div>

    <div class="section">

        <div class="section-title">
            Points forts
        </div>

        <p>{{ $rapport->points_forts }}</p>

    </div>

    <div class="section">

        <div class="section-title">
            Points à améliorer
        </div>

        <p>{{ $rapport->points_a_ameliorer }}</p>

    </div>

    <div class="section">

        <div class="section-title">
            Recommandations pédagogiques
        </div>

        <p>{{ $rapport->recommandations }}</p>

    </div>

    <!-- FOOTER -->
    <div class="footer">
        <strong>Elite Coders Academy</strong>Elite Coders Academy © {{ date('Y') }}
        ||
        <strong>Email</strong> : elitecodersacademy@gmail.com
        ||
        <strong>Tél</strong> : 0708359267 / 0535966329
    </div>

</body>

</html>
