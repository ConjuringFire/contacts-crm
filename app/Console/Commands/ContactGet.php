<?php

namespace App\Console\Commands;

use App\Services\ContactService;
use Illuminate\Console\Command;

class ContactGet extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:get {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get a contact by ID';

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
        $id = (int) $this->argument('id');
        $contact = $this->contactService->getContact($id);

        if (!$contact) {
            $this->error("Contact with ID $id not found.");
            return 1;
        }

        $this->info("Contact ID: {$contact->id}");
        $this->info("Name: {$contact->name}");
        $this->info("Phone: {$contact->phone}");
        $this->info("Email: {$contact->email}");

        return 0;
    }
}