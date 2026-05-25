<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">

    <title>Rapport pédagogique</title>

    <style>
        body {
            font-family: DejaVu Sans;
            padding: 40px;
        }

        h1 {
            color: #8e44ec;
            margin-bottom: 30px;
        }

        .section {
            margin-bottom: 20px;
        }

        .label {
            font-weight: bold;
        }
    </style>

</head>

<body>

    <h1>Rapport pédagogique</h1>

    <div class="section">

        <span class="label">Étudiant :</span>

        {{ $rapport->etudiant->prenom }}
        {{ $rapport->etudiant->nom }}

    </div>

    <div class="section">

        <span class="label">Atelier :</span>

        {{ $rapport->atelier->titre }}

    </div>

    <div class="section">

        <span class="label">Présence :</span>

        {{ $rapport->taux_presence }} %

    </div>

    <div class="section">

        <span class="label">Appréciation :</span>

        <br><br>

        {{ $rapport->appreciation_generale }}

    </div>

    <div class="section">

        <span class="label">Points forts :</span>

        <br><br>

        {{ $rapport->points_forts }}

    </div>

    <div class="section">

        <span class="label">Points à améliorer :</span>

        <br><br>

        {{ $rapport->points_a_ameliorer }}

    </div>

    <div class="section">

        <span class="label">Recommandations :</span>

        <br><br>

        {{ $rapport->recommandations }}

    </div>

</body>

</html>
