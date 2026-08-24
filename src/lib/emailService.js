import { CONTACT_CONFIG } from '../config/contact.js'

/**
 * Dispatches an automated email notification to the administrator
 * when a new lead enquiry is submitted on the website.
 *
 * Uses FormSubmit / Web3Forms direct client dispatch.
 */
export async function sendLeadNotificationEmail(leadData) {
  const recipientEmail = CONTACT_CONFIG.adminNotificationEmail || 'agamozhidigitalcare@gmail.com'

  const emailPayload = {
    _subject: `🔔 New Website Enquiry: ${leadData.name} (${leadData.business_type || leadData.businessType})`,
    _template: 'table',
    _captcha: 'false',
    client_name: leadData.name,
    business_name: leadData.business_name || leadData.businessName || 'Not specified',
    phone_number: leadData.phone,
    business_type: leadData.business_type || leadData.businessType,
    requirement: leadData.requirement,
    message: leadData.message || 'No additional message provided',
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    source: 'Agamozhi Digital Care Website Form',
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    const result = await response.json()
    if (result.success === 'true' || result.success === true) {
      console.log('✅ Lead notification email dispatched to', recipientEmail)
      return { success: true, method: 'formsubmit' }
    } else {
      console.warn('FormSubmit returned notice:', result)
      return { success: true, notice: result.message }
    }
  } catch (err) {
    console.warn('Direct email dispatch notice (non-fatal):', err)
    return { success: false, error: err.message }
  }
}
