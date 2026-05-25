<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">

    <title>Rapport pédagogique</title>

</head>

<body style="font-family: Arial; padding: 30px;">

    <h2 style="color:#8e44ec;">
        Elite Coders Academy
    </h2>

    <p>
        Bonjour,
    </p>

    <p>

        Veuillez trouver ci-joint le rapport pédagogique de :

        <strong>

            {{ $rapport->etudiant->prenom }}

            {{ $rapport->etudiant->nom }}

        </strong>

    </p>

    <p>
        Atelier :
        <strong>
            {{ $rapport->atelier->titre }}
        </strong>
    </p>

    <br>

    <p>
        Merci pour votre confiance.
    </p>

</body>

</html>
