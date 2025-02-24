<?php

namespace App\Console\Commands;

use App\Services\ContactService;
use Illuminate\Console\Command;

class ContactCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:create {name} {phone} {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new contact';

    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        parent::__construct();
        $this->contactService = $contactService;
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $name = $this->argument('name');
        $phone = $this->argument('phone');
        $email = $this->argument('email');

        $data = [
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
        ];

        try {
            $this->contactService->upsert($data);
            $this->info("Contact '$name' created successfully.");
            return 0;
        } catch (\Exception $e) {
            $this->error("Failed to create contact: " . $e->getMessage());
            return 1;
        }
    }
}