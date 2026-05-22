<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('reservations', function (Blueprint $table) {

        $table->foreignId('planning_id')
              ->after('etudiant_id')
              ->constrained('plannings')
              ->onDelete('cascade');

    });
}

    /**
     * Reverse the migrations.
     */
   public function down()
{
    Schema::table('reservations', function (Blueprint $table) {

        $table->dropForeign(['planning_id']);
        $table->dropColumn('planning_id');

    });
}
};
