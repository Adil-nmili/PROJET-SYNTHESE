<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->date('birth_date');
            $table->string('nickname')->nullable();
            $table->string('birth_place');
            $table->string('height');
            $table->string('weight');
            $table->text('championships')->nullable();
            $table->string('image'); // URL de l'image
            
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('players');
    }
    
   
};

