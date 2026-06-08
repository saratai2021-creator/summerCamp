<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /*
     * Run the migrations.
     */

    public function up(): void
    {
       Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('etudiant_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('atelier_id')
                ->constrained()
                ->onDelete('cascade');

            $table->enum('statut', [
                'en_attente',
                'payee',
                'annulee'
            ])
            ->default('en_attente');

            $table->timestamps();
        });
    }

    /*
     * Reverse the migrations.
     */

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
