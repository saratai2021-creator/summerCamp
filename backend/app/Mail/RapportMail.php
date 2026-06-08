<?php

namespace App\Mail;

use App\Models\Rapport;

use Illuminate\Bus\Queueable;

use Illuminate\Mail\Mailable;

use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Storage;

class RapportMail extends Mailable
{
    use Queueable, SerializesModels;



    public $rapport;



    public function __construct(Rapport $rapport)
    {
        $this->rapport = $rapport;
    }


    public function build()
    {
        return $this

            ->subject('Rapport pédagogique Elite Coders Academy')

            ->view('emails.rapport')

            ->attach(

                storage_path(

                    'app/private/' .

                    $this->rapport->chemin_pdf
                )
            );
    }
}
