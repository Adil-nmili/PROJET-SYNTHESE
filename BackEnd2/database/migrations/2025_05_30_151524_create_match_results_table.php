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
        Schema::create('match_results', function (Blueprint $table) {
            $table->id();
            $table->string('league');
            $table->string('status');
            $table->string('homeTeam');
            $table->string('homeImage');
            $table->integer('homeScore');
            $table->string('awayTeam');
            $table->string('awayImage');
            $table->integer('awayScore');
            $table->string('replayLink')->nullable();
            $table->json('homeTeamStats');
            $table->json('awayTeamStats');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('match_results');
    }
};
