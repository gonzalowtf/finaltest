function how(){
	bootbox.alert("This is a fine method to get the best solution for your problem");
}
function createProblemClose(){
	$('#modal1').closeModal();

	//var modal = document.getElementById('modal1');
	//modal.style.display = "none";
	//Materialize.toast("tap the screen to continue",4000);
}
function toast1(){
	Materialize.toast("Problem created!",3000);
	createProblemClose();
}
function editDecisorClose(){
	$('#modal3').closeModal();
}
function toast2(){
	Materialize.toast("Item Deleted!",3000);
}
function toast3(){
	Materialize.toast("Decisor Edited!",3000);
	editDecisorClose();

}
function toast4(){
	Materialize.toast("Item Added!",3000);
}
function editDecisorOpen(){
	$('#modal3').openModal();
}
