'use client';

import Accordion from '@/components/ui/Accordion';

export default function TermsAccordion() {
  return (
    <div className="space-y-4">
      <Accordion title="Payment Terms and Conditions">
        <div className="px-6 py-5 text-brand-forest/80 leading-relaxed">
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>Check in: 14:00 hrs</li>
            <li>Check out: 11:00 hrs</li>
            <li>Rooms will be held until 18:00 hrs. After which, rooms will automatically be released unless hotel is informed of late arrivals</li>
            <li>Guests are required to present a voucher where relevant upon arrival. This can be in printed or digital format. Should agent no longer issue vouchers, written confirmation will be required</li>
            <li>Additional request or extras must be indicated on booking request by Travel Agent/Tour Operator. Where this is not the case, guests will be asked to settle direct.</li>
            <li>The hotel will invoice at the negotiated nett rate, inclusive of 15% VAT and 2% Government Tourism Levy.</li>
            <li>Children&apos;s rate has been indicated on the rates sheets</li>
            <li>Children aged 3 years and under will be accommodated free of charge when sharing a room with their parents or other paying guests</li>
            <li>All rooms accommodate a maximum of 2 guests (except for the Classic Suites at Ilala Lodge Hotel) or whereby an infant child can be accommodated in a cot.</li>
            <li>The hotel reserves the right to amend the above rates in-line with any government statutory increases</li>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Cancellation Policy">
        <div className="px-6 py-5 text-brand-forest/80 leading-relaxed">
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>Cancellations made within 30 days or less of arrival – 100% cancellation fee</li>
            <li>60 – 30 days – 50% cancellation fee</li>
            <li>More than 60 days – 20% non-refundable deposit retained</li>
            <li>The above percentages are based on the total value of the amount shown on invoice</li>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Group Cancellation Policy">
        <div className="px-6 py-5 text-brand-forest/80 leading-relaxed">
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>Applicable to groups of 6 or more paying guests</li>
            <li>A 20% non-refundable deposit must be made within 30 days from the date of placing the booking</li>
            <li>The balance must be made on or before 60 days prior to travel date</li>
            <li>If the booking is made within 60 days of travel full payment is required</li>
            <li>Bookings made within 30 days or less of arrival – 100% cancellation fee</li>
            <li>60 – 30 days – 50% cancellation fee</li>
            <li>More than 60 days – 20% non-refundable deposit retained</li>
            <li>The above percentages are based on the total value of the amount shown on invoice</li>
          </ul>
        </div>
      </Accordion>
    </div>
  );
}
