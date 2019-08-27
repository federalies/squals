const replyCodes = [
  211, //  System status, or system help reply
  214, //  Help message (Information on how to use the receiver or the meaning of a particular non-standard command; this reply is useful only to the human user)
  220, //  <domain> Service ready
  221, //  <domain> Service closing transmission channel
  250, //  Requested mail action okay, completed
  251, //  User not local; will forward to <forward-path> (See Section 3.4)
  252, //  Cannot VRFY user, but will accept message and attempt delivery (See Section 3.5.3)
  354, //  Start mail input; end with <CRLF>.<CRLF>
  421, //  <domain> Service not available, closing transmission channel (This may be a reply to any command if the service knows it must shut down)
  450, //  Requested mail action not taken: mailbox unavailable (e.g., mailbox busy or temporarily blocked for policy reasons)
  451, //  Requested action aborted: local error in processing
  452, //  Requested action not taken: insufficient system storage
  455, //  Server unable to accommodate parameters
  500, //  Syntax error, command unrecognized (This may include errors such as command line too long)
  501, //  Syntax error in parameters or arguments
  502, //  Command not implemented (see Section 4.2.4)
  503, //  Bad sequence of commands
  504, //  Command parameter not implemented
  550, //  Requested action not taken: mailbox unavailable (e.g., mailbox not found, no access, or command rejected for policy reasons)
  551, //  User not local; please try <forward-path> (See Section 3.4)
  552, //  Requested mail action aborted: exceeded storage allocation
  553, //  Requested action not taken: mailbox name not allowed (e.g.,mailbox syntax incorrect)
  554, //  Transaction failed (Or, in the case of a connection-opening response, "No SMTP service here")
  555 //  MAIL FROM/RCPT TO parameters not recognized or not implemented
]

// 1.class
const SUCCESS = [2, 0, 0]
const ERR_TRANSIENT = [4, 0, 0]
const ERR_PERMANENT = [5, 0, 0]

// 2.subject
const OTHER = [0, 0, 0] // Other or Undefined Status
const ADDRESSING = [0, 1, 0] // Addressing Status
const MAILBOX = [0, 2, 0] // Mailbox Status
const MAILSYSTEM = [0, 3, 0] // Mail System Status
const NET_ROUTING = [0, 4, 0] // Network and Routing Status
const PROTO_STATUS = [0, 5, 0] // Mail Delivery Protocol Status
const CONTENT = [0, 6, 0] // Message Content or Media Status
const SEC_POLICY = [0, 7, 0] // Security or Policy Status

// 3.details
enum smtpStatusCodes {}

enum smtpReplyCodes {}
