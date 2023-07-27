
function updateFen(fen, move) {
  //Move is in source square -> target square format
  const objNotation = {
    sourceFile: alphabetOrd(move[0]),
    sourceRank: (8 - (Number(move[1])-1))-1,
    targetFile: alphabetOrd(move[2]),
    targetRank: (8 - (Number(move[3])-1))-1
  }
  //String manip is easier if we manipulate an array rather than a string. 
  let returnFEN = fen.split(" ")[0].split('/');
  
  //Check if the source square has a peice on it. 
  if(returnFEN[objNotation.sourceRank] === '8'){
    //Empty rank
    return fen;
  }
  const sourcePeice = expandedForm(returnFEN[objNotation.sourceRank])[objNotation.sourceFile]
  //Digits represent empty spaces. 
  if(isDigit(sourcePeice)){
    return fen
  }
  //There is a piece. We don't care about move validity for this project, so now we just add the peice at the target square. 
  if(returnFEN[objNotation.targetRank] === '8'){
    //Empty Rank
    returnFEN[objNotation.targetRank] = `${objNotation.targetFile}${sourcePeice}`
    if(objNotation.targetFile !== 7){
      returnFEN[objNotation.targetRank] += `${8-objNotation.targetFile-1}`
    }
  }else{
    //Other peices on the rank. 
    let array = expandedForm(returnFEN[objNotation.targetRank]).split("")
    array[objNotation.targetFile] = sourcePeice;
    returnFEN[objNotation.targetRank] = collapsedForm(String(array).replaceAll(',', ''))
  }
  //Remove the peice at the source square
  let expdRank = expandedForm(returnFEN[objNotation.sourceRank]).split("")
  expdRank[objNotation.sourceFile] = 1;

  returnFEN[objNotation.sourceRank] = collapsedForm(String(expdRank).replaceAll(',',''))
  //Change the active player. We don't actually care about castling rights or en passant
  let permissiveData = ` ${fen.indexOf('w') > 0 ? 'b':'w'} KQkq - - 0 1`
  console.log(String(returnFEN).replaceAll(',',"/") + permissiveData)
  return String(returnFEN).replaceAll(',',"/") + permissiveData;
}
function collapsedForm(rank){
  let rankCollapsed = ""
  let count = 0
  for(let i = 0;i<rank.length;i++){
    if(isDigit(rank[i])){
      count++;
    }else{
      rankCollapsed += `${count}${rank[i]}`
      count = 0
    }
  }
    rankCollapsed += `${count}`
    rankCollapsed = rankCollapsed.replaceAll("0", "")
  return rankCollapsed
}
function expandedForm(rank){
  let expandedRank = "";
  for(let i = 0;i< rank.length;i++){
    if(!isDigit(rank[i])){
      expandedRank += rank[i]
    }else{
      expandedRank = expandedRank.padEnd(expandedRank.length + Number(rank[i]), '0')
    }
  }
  return expandedRank
}
//Utility function. Returns the place of a letter in the alphabet
function alphabetOrd(char){
  return ord(char.toLowerCase()) - ord('a') 
}
//Readability. Returns the unicode value of a single-character string. 
function ord(char){
  return char.charCodeAt(0)
}
//This should really be part of javascript idk why it isn't. 
function isDigit(char){
  return ord(char) - ord('0') >= 0 && ord('9') - ord(char) >= 0
}


export default updateFen