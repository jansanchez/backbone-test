<?php
function write_log($txt) {
  file_put_contents("put_log.txt", $txt);
  chmod("put_log.txt", 0666);
}
require 'dauth.php';
// customize the following defines:-
define('AUTH_REALM', 'backbone.pe/methods');
define('URL_BASE', 'http://backbone.pe/methods');

/* ---
  The following sample authorization function uses an array of
  user names and passwords defined and fixed here.

  An actual implementation might read the array from an external
resource.
  The use of an ArrayIterator makes it moderately easy to extend this
  mechanism.
--- */

function authorize() {
  $auth = new authorizer(AUTH_REALM, new ArrayIterator(array('user1' =>
'password1', 'user2' => 'password2')));
  $auth->check(); // dies if not OK
}

function puterror($status, $body, $log = FALSE) {
  header ("HTTP/1.1 $status");
  if ($log) write_log($log);
  die("<html><head><title>Error
$status</title></head><body>$body</body></html>");
}

function putfile() {
  $f = pathinfo($fname = $_SERVER['REQUEST_URI']);
  if ($f['extension'] != 'html') puterror('403 Forbidden', "Bad file
type in $fname");
  $f = fopen($fname = $f['basename'], 'w');
  if (!$f) puterror('409 Create error', "Couldn't create file");
  $s = fopen('php://input', 'r'); // read from standard input
  if (!$s) puterror('404 Input Unavailable', "Couldn't open input");
  while($kb = fread($s, 1024)) fwrite($f, $kb, 1024);
  fclose($f);
  fclose($s);
  chmod($fname, 0666);
  $fname = URL_BASE . $fname;
  header("Location: $fname");
  header("HTTP/1.1 201 Created");
  echo "<html><head><title>Success</title></head><body>";
  echo "<p>Created <a href='$fname'>$fname</a> OK.</p></body></html>";
}

if ($_SERVER['REQUEST_METHOD'] != 'PUT')
  header("HTTP/1.1 403 Bad Request");
else {
  authorize();
  putfile();
  // uncommment the next line to debug misbehaviour
  //write_log(date('c') . "\n" . $_SERVER['REQUEST_URI'] . "\nStatus:
$retcode";
}

