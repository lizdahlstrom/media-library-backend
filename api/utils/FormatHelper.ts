class FormatHelper {
  static getCurrentDateInSQLFormat () {
    return new Date().toISOString().split('T')[0]
  }
}

export default FormatHelper
