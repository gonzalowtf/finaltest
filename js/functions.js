function how(){
	bootbox.alert("This is a fine method to get the best solution for your problem");
}
function createProblemClose(){
	$('#newProblemModal').closeModal();

	//var modal = document.getElementById('newProblemModal');
	//modal.style.display = "none";
	//Materialize.toast("tap the screen to continue",4000);
}
function toast1(){
	Materialize.toast("Problem created!",3000);
	createProblemClose();
}
function addDecisorClose(){
	$('#addDecisorModal').closeModal();
}
function addCriteriaClose(){
	$('#addCriteriaModal').closeModal();
}
function addAlternativeClose(){
	$('#addAlternativeModal').closeModal();
}
function eraseDecisorClose(){
	$('#eraseDecisorModal').closeModal();
}
function eraseCriteriaClose(){
	$('#eraseCriteriaModal').closeModal();
}
function eraseAlternativeClose(){
	$('#eraseAlternativeModal').closeModal();
}
function viewAlternativeClose(){
		$('#viewAlternativesWeights').closeModal();

}
function viewCriteriaClose(){
	$('#viewCriteriasWeights').closeModal();
}
function eraseProblemClose(){
	$('#eraseProblemModal').closeModal();
}
function editDecisorClose(){
	$('#editDecisorModal').closeModal();
}
function editCriteriaClose(){
	$('#editCriteriaModal').closeModal();
}
function editAlternativeClose(){
	$('#editAlternativeModal').closeModal();
}
function editProblemClose(){
	$('#editProblemModal').closeModal();
}
function toast2(){
	Materialize.toast("Decisor Erased!",3000);
	eraseDecisorClose();
}
function toast3(){
	Materialize.toast("Decisor Edited!",3000);
	editDecisorClose();

}
function toast4(){
	Materialize.toast("Decisor Added!",3000);
	addDecisorClose();
}
function toast5(){
	Materialize.toast("Problem Erased!",3000);
	eraseProblemClose();
}
function toast6(){
	Materialize.toast("Problem edited!",3000);
	editProblemClose();
}
function toast7(){
	Materialize.toast("Criteria Edited !",3000);
	editCriteriaClose();
}
function toast8(){
	Materialize.toast("Alternative Edited !",3000);
	editAlternativeClose();
}
function toast9(){
	Materialize.toast("Criteria Erased !",3000);
	eraseCriteriaClose();
}
function toast10(){
	Materialize.toast("Alternative Erased !",3000);
	eraseAlternativeClose();
}
function toast11(){
	Materialize.toast("Criteria Added!",3000);
	addCriteriaClose();
}
function toast12(){
	Materialize.toast("Alternative Added!",3000);
	addAlternativeClose();
}
function editDecisorOpen(){
	$('#editDecisorModal').openModal();
}
function editCriteriaOpen(){
	$('#editCriteriaModal').openModal();
}
function editAlternativeOpen(){
	$('#editAlternativeModal').openModal();
}
function eraseDecisorOpen(){
	$('#eraseDecisorModal').openModal();

}
function eraseCriteriaOpen(){
	$('#eraseCriteriaModal').openModal();

}
function addDecisorOpen(){
	$('#addDecisorModal').openModal();
}
function addCriteriaOpen(){
	$('#addCriteriaModal').openModal();
}
function addAlternativeOpen(){
	$('#addAlternativeModal').openModal();
}
function editProblemOpen(){
	$('#editProblemModal').openModal();
}
function eraseProblemOpen(){
	$('#eraseProblemModal').openModal();

}
function eraseAlternativeOpen(){
	$('#eraseAlternativeModal').openModal();

}
function viewCriteriaOpen(){
	$('#viewCriteriasWeights').openModal();
}
function viewAlternativeOpen(){
		$('#viewAlternativesWeights').openModal();

}
function noChangesAlternativeToast(){
	Materialize.toast("No Changes Saved",3000);
	$('#editAlternativeModal').closeModal();
}
function noChangesDecisorToast(){
	Materialize.toast("No Changes Saved",3000);
	$('#editDecisorModal').closeModal();
}
function noChangesCriteriaToast(){
	Materialize.toast("No Changes Saved",3000);
	$('#editCriteriaModal').closeModal();
}
function DecisorsHelpOpen(){
	$('#DecisorsHelpModal').openModal();

}
function CriteriasHelpOpen(){
	$('#CriteriasHelpModal').openModal();

}
function AlternativesHelpOpen(){
	$('#AlternativesHelpModal').openModal();

}
function ResultsHelpOpen(){
	$('#ResultsHelpModal').openModal();

}
function HowItWorksOpen(){
	$('#HowItWorksModal').openModal();
}
function openPDF(){

window.open('/files/UserManual.pdf');

}
function eraseAccount(){
	$('#eraseAccount').openModal();

}

function getVar(){

      var url = location.search.replace("?",",");
      var arr=url.split("&");
      var obj = {};
      for (var i =0; i<arr.length;i++){
        var x = arr[i].split("=");
        obj[x[0]]=x[1];
      }
      return obj;

    }
