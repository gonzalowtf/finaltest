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
function eraseDecisorClose(){
	$('#eraseDecisorModal').closeModal();
}
function eraseProblemClose(){
	$('#eraseProblemModal').closeModal();
}
function editDecisorClose(){
	$('#editDecisorModal').closeModal();
}
function editProblemClose(){
	$('#editProblemModal').closeModal();
}
function toast2(){
	Materialize.toast("Decisor Deleted!",3000);
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
	Materialize.toast("Problem erased!",3000);
	eraseProblemClose();
}
function toast6(){
	Materialize.toast("Problem name updated!",3000);
	editProblemClose();
}
function editDecisorOpen(){
	$('#editDecisorModal').openModal();
}
function eraseDecisorOpen(){
	$('#eraseDecisorModal').openModal();

}
function addDecisorOpen(){
	$('#addDecisorModal').openModal();
}
function editProblemOpen(){
	$('#editProblemModal').openModal();
}
function eraseProblemOpen(){
	$('#eraseProblemModal').openModal();

}