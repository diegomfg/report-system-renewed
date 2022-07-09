module.exports = (hbs) =>
{

  /**
 * @summary Set up Handlebars
 * Added the isLanding helper function 
 * to ensure that the navbar is rendered everywhere else 
 * but the landing page
 */
  hbs.registerHelper("isLanding", function (page)
  {
    return page !== "Landing"
  })

  /**
   * @summary Helper function to summary down a report's description down to 150 characters
   */
  hbs.registerHelper("summary", function (text)
  {
    return text.slice(0, 150) + '...'
  })

  /**
   * @summary Checks if the model category is equal to the <select> element value to set default <option> as selected
   * @todo Remove, not doing this anymore
   */
  hbs.registerHelper("isDefaultValue", function (candidate, value)
  {
    return candidate == value;
  })

  /**
   * @summary Returns the Mongodb timestamp as a UTC date to be rendered in the view
   */
  hbs.registerHelper("formatDate", function (date)
  {
    return new Date(date).toUTCString()
  })

  /**
   * @summary Returns true if profile contains more than one object
   */
  hbs.registerHelper("hasManyProfile", function (profile)
  {
    return Array.isArray(profile)
  })
}