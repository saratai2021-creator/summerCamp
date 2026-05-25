<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run migrations
     */
    public function up(): void
    {
        Schema::create('rapports', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Relations
            |--------------------------------------------------------------------------
            */

            $table->foreignId('etudiant_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('atelier_id')
                ->constrained()
                ->onDelete('cascade');

            // formateur/admin qui crée rapport
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->onDelete('cascade');

            /*
            |--------------------------------------------------------------------------
            | Période
            |--------------------------------------------------------------------------
            */

            $table->date('date_debut');

            $table->date('date_fin');

            /*
            |--------------------------------------------------------------------------
            | Présence
            |--------------------------------------------------------------------------
            */

            $table->integer('total_seances');

            $table->integer('seances_assistees');

            $table->float('taux_presence');

            /*
            |--------------------------------------------------------------------------
            | Notes
            |--------------------------------------------------------------------------
            */

            $table->decimal('moyenne_exercices', 5, 2)
                ->nullable();

            $table->decimal('moyenne_examen', 5, 2)
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | Modules
            |--------------------------------------------------------------------------
            */

            $table->text('modules_termines')
                ->nullable();

            $table->text('modules_en_cours')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | Évaluation pédagogique
            |--------------------------------------------------------------------------
            */

            $table->text('appreciation_generale');

            $table->text('points_forts');

            $table->text('points_a_ameliorer');

            $table->text('recommandations');

            /*
            |--------------------------------------------------------------------------
            | PDF
            |--------------------------------------------------------------------------
            */

            $table->string('chemin_pdf')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse migrations
     */
    public function down(): void
    {
        Schema::dropIfExists('rapports');
    }
};