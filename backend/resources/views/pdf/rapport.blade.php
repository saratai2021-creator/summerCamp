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
