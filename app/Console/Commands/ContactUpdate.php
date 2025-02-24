<?php

namespace App\Console\Commands;

use App\Services\ContactService;
use Illuminate\Console\Command;

class ContactUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:update {id} {--name=} {--phone=} {--email=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update an existing contact';

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
        $id = $this->argument('id');
        $name = $this->option('name');
        $phone = $this->option('phone');
        $email = $this->option('email');

        $contact = $this->contactService->getContact($id);

        if (!$contact) {
            $this->error("Contact with ID $id not found.");
            return 1;
        }

        $data = [];

        $data['name'] = $name !== null ? $name : $contact['name'];

        $data['phone'] = $phone !== null ? $phone : $contact['phone'];

        $data['email'] = $email !== null ? $email : $contact['email'];
        
        if (empty($data)) {
            $this->error("No update data provided.");
            return 1;
        }

        try {
            $this->contactService->upsert($data, $id);
            $this->info("Contact with ID $id updated successfully.");
            return 0;
        } catch (\Exception $e) {
            $this->error("Failed to update contact: " . $e->getMessage());
            return 1;
        }
    }
}