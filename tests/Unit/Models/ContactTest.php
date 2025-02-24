<?php

namespace Tests\Unit\Models;

use App\Models\Contact;
use PHPUnit\Framework\TestCase;

class ContactTest extends TestCase
{
    public function test_phone_number_validation_rules(): void
    {
        // regex for AU/NZ E164 format
        $regex = '/^\+(61|64)\d{8,12}$/';

        // check that there is rule for phone and that it matches AU/NZ E164 format
        $rules = Contact::rules();
        $this->assertArrayHasKey('phone', $rules);
        $this->assertContains('regex:'.$regex, $rules['phone']);
        
        // array of valid phone numbers
        $validNumbers = [
            '+61412345678',
            '+64211234567',
            '+642212345678',
        ];
        
        // array of invalid phone numbers
        $invalidNumbers = [
            '+15551234567',
            '+611234567',
            '+61',
        ];

        // check that the valid numbers pass the regex check
        foreach ($validNumbers as $number) {
            $this->assertEquals(1, preg_match($regex, $number), "Expected $number to be valid.");
        }

        // check that the invalid numbers fail the regex check
        foreach ($invalidNumbers as $number) {
            $this->assertEquals(0, preg_match($regex, $number), "Expected $number to be invalid.");
        }
    }
}