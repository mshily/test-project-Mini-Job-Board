<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('current_jobs')->insert([
            'title'         => 'Frontend Intern',
            'description'   => '...',
            'contact_email' => 'hr@acme.com',
            'location'      => 'Acme Corp - New York, NY',
            'is_remote'     => true,
            'tags'          => json_encode(['React','Internship']),
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        DB::table('current_jobs')->insert([
            'title'         => 'Senior Vue Engineer',
            'description'   => 'TODO',
            'contact_email' => 'gr@gmail.com',
            'location'      => 'Beta LCC - Spain, BCN',
            'is_remote'     => false,
            'tags'          => json_encode(['Vue','Fill-time']),
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        DB::table('current_jobs')->insert([
            'title'         => 'Middle HFT Engineer',
            'description'   => 'TODO desc',
            'contact_email' => 'hrhft@acme.com',
            'location'      => 'Blum - Nek, NY',
            'is_remote'     => true,
            'tags'          => json_encode(['HFT','C++', 'Part-time']),
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

    }
}
