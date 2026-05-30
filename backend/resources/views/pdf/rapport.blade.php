<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 13px;
            color: #1e293b;
            margin: 0;
            padding: 0;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .header {
            background: #081120;
            padding: 25px 35px;
            border-bottom: 4px solid #38bdf8;
            margin-bottom: 20px;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
        }

        .subtitle {
            color: #cbd5e1;
            font-size: 12px;
            margin-top: 5px;
        }

        /* =====================================================
           SECTIONS
        ===================================================== */

        .section {
            margin: 22px 35px;
            page-break-inside: avoid;
        }

        .section-title {
            background: #eff6ff;
            color: #2563eb;
            padding: 10px 14px;
            font-size: 14px;
            font-weight: bold;
            border-left: 4px solid #38bdf8;
            margin-bottom: 10px;
        }

        /* =====================================================
           TABLE
        ===================================================== */

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        th {
            background: #081120;
            color: white;
            font-weight: bold;
        }

        td {
            background: #ffffff;
        }

        td,
        th {
            border: 1px solid #dbeafe;
            padding: 10px;
        }

        /* =====================================================
           PARAGRAPH
        ===================================================== */

        p {
            line-height: 1.8;
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;

            border-top: 2px solid #38bdf8;

            text-align: center;

            font-size: 11px;

            padding-top: 8px;

            color: #64748b;
        }
    </style>

</head>

<body>

    <!-- HEADER -->

    <div class="header">

        <div class="title">
            Elite Coders Academy
        </div>

        <div class="subtitle">
            Rapport pédagogique officiel
        </div>

    </div>

    <!-- INFORMATIONS -->

    <div class="section">

        <div class="section-title">
            Informations générales
        </div>

        <table>

            <tr>
                <td width="30%">
                    <strong>Étudiant</strong>
                </td>

                <td>
                    {{ $rapport->etudiant->prenom }}
                    {{ $rapport->etudiant->nom }}
                </td>
            </tr>

            <tr>
                <td>
                    <strong>Atelier</strong>
                </td>

                <td>
                    {{ $rapport->atelier->titre }}
                </td>
            </tr>

            <tr>
                <td>
                    <strong>Période</strong>
                </td>

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

                <td>
                    {{ number_format($rapport->taux_presence, 2) }} %
                </td>
            </tr>

        </table>

    </div>

    <!-- PERFORMANCE -->

    <div class="section">

        <div class="section-title">
            Performance académique
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

    <!-- APPRECIATION -->

    <div class="section">

        <div class="section-title">
            Appréciation générale
        </div>

        <p>
            {{ $rapport->appreciation_generale }}
        </p>

    </div>

    <!-- POINTS FORTS -->

    <div class="section">

        <div class="section-title">
            Points forts
        </div>

        <p>
            {{ $rapport->points_forts }}
        </p>

    </div>

    <!-- AMELIORATIONS -->

    <div class="section">

        <div class="section-title">
            Points à améliorer
        </div>

        <p>
            {{ $rapport->points_a_ameliorer }}
        </p>

    </div>

    <!-- RECOMMANDATIONS -->

    <div class="section">

        <div class="section-title">
            Recommandations pédagogiques
        </div>

        <p>
            {{ $rapport->recommandations }}
        </p>

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
