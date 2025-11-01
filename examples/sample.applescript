-- Sample AppleScript file
-- Demonstrates various language features

(*
   Block comment
   Multiple lines
*)

-- Properties
property appName : "My Application"
property version : 1.0

-- Simple handler
on greet(userName)
  set greeting to "Hello, " & userName & "!"
  return greeting
end greet

-- Handler with labeled parameters
to calculateArea given width:w, height:h
  set area to w * h
  return area
end calculateArea

-- Variable assignments
set x to 10
set y to 20
set message to "AppleScript"

-- Lists
set myList to {1, 2, 3, 4, 5}
set colors to {"red", "green", "blue"}

-- Records
set person to {name:"John", age:30, city:"New York"}

-- Conditionals
if x > 5 then
  set result to "x is greater than 5"
else if x = 5 then
  set result to "x equals 5"
else
  set result to "x is less than 5"
end if

-- Repeat loops
repeat 5 times
  set x to x + 1
end repeat

repeat with i from 1 to 10
  set x to x + i
end repeat

repeat with item in myList
  -- Process each item
  set x to x + item
end repeat

repeat while x < 100
  set x to x * 2
end repeat

-- Tell statement
tell application "Finder"
  activate
  set windowCount to count of windows
end tell

-- Try-catch
try
  set result to x / 0
on error errMsg number errNum
  return "Error: " & errMsg
end try

-- Boolean operations
set isValid to true
set isEnabled to false
set combined to isValid and not isEnabled

-- Arithmetic operations
set sum to x + y
set difference to x - y
set product to x * y
set quotient to x / y
set power to x ^ 2

-- Comparison operations
set isEqual to x = y
set isGreater to x > y
set isLessOrEqual to x ≤ y

-- String operations
set fullName to "John" & " " & "Doe"

-- Containment checks
if "app" is in message then
  return true
end if

-- Script object
script MyScript
  property counter : 0

  on increment()
    set counter to counter + 1
  end increment

  on getCounter()
    return counter
  end getCounter
end script
