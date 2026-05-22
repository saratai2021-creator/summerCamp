<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rapports', function (Blueprint $table) {

            $table->id();

            $table->foreignId('etudiant_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->foreignId('atelier_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->foreignId('user_id')
                  ->constrained()
                  ->onDelete('cascade');

            // période du rapport
            $table->date('date_debut');

            $table->date('date_fin');

            // présence
            $table->integer('total_seances');

            $table->integer('seances_assistees');

            $table->float('taux_presence');

            // notes
            $table->decimal('moyenne_exercices', 5, 2)
                  ->nullable();

            $table->decimal('moyenne_examen', 5, 2)
                  ->nullable();

            // progression
            $table->text('modules_termines')
                  ->nullable();

            $table->text('modules_en_cours')
                  ->nullable();

            // commentaires
            $table->text('appreciation_generale');

            $table->text('points_forts');

            $table->text('points_a_ameliorer');

            $table->text('recommandations');

            // pdf
            $table->string('chemin_pdf')
                  ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rapports');
    }
};