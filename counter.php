<?php
$file = "counter.txt"; // File to store the hit count

// Read the current count from the file
$count = file_exists($file) ? intval(file_get_contents($file)) : 0;

// Increment the count by 1
$count++;

// Store the updated count in the file
file_put_contents($file, $count);

// Output the count
echo "Hits: " . $count;
?>
