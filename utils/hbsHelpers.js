/**
 * @summary Set up Handlebars
 * Added hbs helpers to assist the view rendering the content.
 */
module.exports = (hbs) =>
{

  /**
   * @todo Maybe change this to isAuthorOrAdmin
   * @summary Validates that the resource to be rendered has the same author as the current user.
   * else, if the current user has role of ADMIN, then proceed too.
   */
  hbs.registerHelper('isAuthor', (user, report) =>
  {
    return user.email === report.author;
  })
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
    return profile.length > 1
  })

  hbs.registerHelper("formatAuthor", function (author)
  {
    return author.slice(0, author.indexOf('@'));
  })
}