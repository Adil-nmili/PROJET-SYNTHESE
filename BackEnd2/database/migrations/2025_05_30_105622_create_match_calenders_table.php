<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('match_calendars', function (Blueprint $table) {
            $table->id();
            $table->string('league');
            $table->string('home_team');
            $table->string('away_team');
            $table->string('home_logo')->nullable();
            $table->string('away_logo')->nullable();
            $table->dateTime('match_date');
            $table->string('venue')->nullable();
            $table->string('status')->default('scheduled'); // scheduled, live, completed, postponed
            $table->text('description')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('match_calendars');
    }
};