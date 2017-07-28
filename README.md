# Captain's Mistress (Connect Four) Challenge
==================================================================

### Contestant : Daimen Q. Williams
###### [DaimenWill@gmail.com](mailto:DaimenWill@gmail.com)

---
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#### Overview:
  * About
  * Challenge Breakdown
  * Methodology
     + Win Criteria
     + Connection Tracking
     + Piece States and Illegal Moves
     + AI Planning
  * JS Structure
  * Simple UI Integration

------

# About

  Challenge an opponent in a race against time to connect four of your game pieces in a straight line either horizontally, vertically, or diagonally. As a turn based strategy game, it's just as important to block your opponent's advances as it is to gain your own. Pieces are dropped down into a cloumn and are vertically divided into congruent rows.

------

# Challenge Breakdown

  1. The simulated board will be 6 units tall and 7 units wide - 7x6
  2. The human player goes first by choosing one of the columns; each player       then switch off taking turns.
  3. The game must work as described above and conclude when one player has        connected four of their pieces in a row
  4. There shouls be **no use of any additional technologies or frameworks**       aside from **_vanilla Javascript, HTML, and CSS_**

-------


# Methodology

The following will highlight my specific thought process about proceeding with this challenge. I'm sure there are various ways to go about it.

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

### Win Criteria
The seemingly most logical thing to do is think up how to represent a player winning the game. We need:
   * a way of knowing which pieces belong to the player
   * a way of knowing which pieces are connected
   * a way to track if **_other_** pieces are connected to connecting pieces
   * a way of telling if this connection chain is in a straight pattern

The immediate conclusion to draw from this was to take advantage of prototypical inheritance and have several game pieces be objects that store some value identifying their player. Upon knowing this (who their player is), we now have a way of proving a connection from a direct comparison. But what to compare to? I thought of it geometrically:

||||                    
|-|:-:|-:|
|%|+|%|
|-|X|-|      
|%|+|%|

Taking "X" above as an example, it can only be connected to it's immediate neighbors : the %%s, --s, and ++s . If X's coordinates in this plane are (x,y), then when a piece has (x +/- 1 , y +/- 1) - the piece is diagonally connected like the percent signs above. With ( x , y +/- 1) , they are connected horizontally like the minuses above, and with (x +/- 1 , y) they are connected vertically like the pluses above [I apologize for the math, I'm sure this is like torture to read].

Seeing it like this, it makes sense to assign the objects with their own coordinate values to relate to each other. The coordinate relationships above would be used in two of my functions ("_makePieceNotWar()_" , and "_makePieceConnections()_").

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

### Connection Tracking

With the ability to compare to neighbor elements given their position, how do we tell if they share the same player and are connected to other friendly pieces? Pointers! After discovering a piece is the neighbor of another piece we could store that value as part of it's object to point back to later. Recalling the table from above, I decided to have a huge number of 8 pointer fields in each piece object : _north, south, east, west, northE, southE, southW, & northW._ This would cover all their neighbors if directly searching for them.

Now to tackle finding out if several neighbor connections make a line. It would be extremely inefficient to search for the neighbors of an object, than search for all the neighbors of each of their neighbors; instead, given those directions you can reason that, in order to make a straight line, a neighbor connected from one direction must be connected to another friendly piece from the opposite. If X is connected to a piece at X's south, that piece must be connected to another friendly piece at that piece's north, OR X is connected to another piece at X's north - in order to make a straight line... This is of course if we're going both ways down the line assuming the piece we start at is not the end piece - but somewhere in the middle. This functionality is incorporated in the "_comboCheck()_" and "_updateCombo()_" methods.

The main gist is that I had two static arrays, each with a length of 8 storing all the directions mentioned; however, one stored opposite values for the same values of the other array making functions using their indexes as iterations easier. These were used to store each player's longest connection chains in a small list kept by each player (and also delete them from it if it's neighbor is a deadend);

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

### Piece States and Illegal Moves

Given the above procedural thought process, how would I start the game and how would I start inhabiting the game space with game piece objects? At this point it seems that if we add in all of the above, we would be looking at some fairly heavy scaling game program for what we're trying to accomplish. It woud be less of a burden to compare everything each turn and keep track of player pieces if when a player places a piece, they immediatly create neighbors around it passing them it's pointer. So there should be a function [makePieceNotWar() and makePieceConnections()] in place to create a piece on the board and it's neighbors at the same time. However, with this, how do we know a space is empty if we're generating roughly 4 or 3 pieces each placement?

This is when it was decided to introduce 3 states of the piece. Upon immediate creation, a piece is assigned no player but just a placement and pointers to the piece that spawned it as its neighbor (the catalyst piece also updates its pointers to the new piece). These pointers will never change again because the pieces never change position. If the pieces form a sizeable chain (up to seven chains are saved to the player's state), then they are updated to the list of possible winning combinations. With this definition, a player is allowed to place a piece in a column if its last indexed piece is a free piece (one will automatically be generated on top of any claimed piece by definition). The transition over is simply the player passing their id to the free Piece, matching ids mean that they can form connections with neighbors who also match.

A player is not allowed to place a piece in unidentified territory or territory in which the column is at capacity (a length of 6). However, this doesn't seem to happen often even playing at random.

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

### AI Possibilities

If given the time I was interested in putting in multi-level AI capabilities. currently the only AI in place is "Derp BOT" - EASY, and it moves at random. There was a breif implementation where it prioritized winning plays but there's a bug I have to fix before attempting that. The other AI's that were planned and I've made some future proofing for were "Captain BOT" - intermediate, and "Mistress BOT." The captain's priority is to make a winning move if one exists and to screw over the player as much as possible. This would entail checking its bestComboList passed to its player's state and seeing if he's one move away from a connect 4. There would also be logic in place to check the human player's best combo array, and constantly place a piece at the end of their best combo. The mistress would also take this action, but prioritze her winning the game by making her best combo longer.

As of the making of this README, some functionally such as saved best comboList states is present and is being used; however, traversing through them (namely updating their directions as the list gets updated) is a slightly arduous task (or maybe I just need to take a step back and go on holiday for a bit...).
-------

### JS Structure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are 7 files present which contain:
   1. Player.js
        * Prototype player object as discussed
   2. Piece.js
        * Prototype piece object as discussed
   3. setup.js
        * Global variables for playGrid, game, and player states
        * functions to update DOM and show player interacting with board
   4. helpers.js
        * Conditional and Recursive functions used quite frequntly that would             be redundant to keep in exisiting functions.
   5. turnLogic.js
        * Functionality to get connections, make pieces, and check combos                (and win conditions)
   6. CaptainMistress.js
        * Ties in above functionality to create a main game loop upon player
            click event
   7. DerpBotAI.js
        * Derp Bot computer turn AI that's still very much a work in progress             but for now it's perfectly fine playing randomly and sometimes               winning.

-----------------

### Simple UI Structure

An image map of the game board and an invisible table are absolutely positioned on top each other with the grid having priority. The grid has clickable areas with ids relating to their column index. This index is passed to the onClick() function to process a player attempting to drop their piece in a column. Once cleared, an image will be injected into the innerHTML of a table cell and show up behing the grid as played slot.

Buttons were recently added to change the opposing player. **_Once the user clicks a column the game will start_** so if you want to play the entire game against the computer or a human player click the button prior. They can switch places midgame as well which leads to surprising turn arounds.

---------------
