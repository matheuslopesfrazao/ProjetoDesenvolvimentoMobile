$(".rslides").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 500,            // Integer: Speed of the transition, in milliseconds
  timeout: 8000,          // Integer: Time between slide transitions, in milliseconds
});

$(".rslides_portfolio").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 500,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pager: true,           // Boolean: Show pager, true or false
});

/* Animações*/

Visibility.onVisible(function(){
	setTimeout(function() {
		$(".introducao h1").addClass("animated fadeInDown");
	}, 400);
});
Visibility.onVisible(function(){
	setTimeout(function() {
		$(".introducao blockquote").addClass("animated fadeInDown");
	}, 800);
});
Visibility.onVisible(function(){
	setTimeout(function() {
		$(".introducao .btn").addClass("animated fadeInDown");
	}, 1200);
});
Visibility.onVisible(function(){
	setTimeout(function() {
		$(".animar").addClass("animated fadeInDown");
	}, 1600);
});
Visibility.onVisible(function(){
	setTimeout(function() {
		$(".introducao-interna h1").addClass("animated fadeInDown");
	}, 400);
});
Visibility.onVisible(function(){
	setTimeout(function() {
		$(".introducao-interna p").addClass("animated fadeInDown");
	}, 800);
});
Visibility.onVisible(function(){
	setTimeout(function() {
		$(".animar-interno").addClass("animated fadeInDown");
	}, 1200);
});

// Formulario

$('.formphp').on('submit', function() {
	var emailContato = "matheuslopessobrinho@gmail.com"; // Escreva aqui o seu e-mail entre as aspas

	var that = $(this),
			url = that.attr('action'),
			type = that.attr('method'),
			data = {};
	
	that.find('[name]').each(function(index, value) {
		var that = $(this),
				name = that.attr('name'),
				value = that.val();
				
		data[name] = value;
	});
	
/* O Ajax serve para não atualizar todo o site quando o usuário clicar em "Enviar", ou seja ele irá mostrar uma mensagem de "Sucesso" ou de "Erro". (Foi isso que entendi kkk) */
	$.ajax({
		url: url,
		type: type,
		data: data,
		success: function(response) {
		
			if( $('[name="leaveblank"]').val().length != 0 ) {
				$('.formphp').html("<div id='form-erro'></div>");
				$('#form-erro').html("<span>Falha no envio!</span><p>Você pode tentar novamente, ou enviar direto para o e-mail " + emailContato + " </p>")
				.hide()
				.fadeIn(1500, function() {
				$('#form-erro');
				});
			} else {
			
				$('.formphp').html("<div id='form-send'></div>");
				$('#form-send').html("<span>Mensagem enviada!</span><p>Em breve eu entro em contato com você. Abraços.</p>")
				.hide()
				.fadeIn(1500, function() {
				$('#form-send');
				});
			};
		},
		error: function(response) {
			$('.formphp').html("<div id='form-erro'></div>");
			$('#form-erro').html("<span>Falha no envio!</span><p>Você pode tentar novamente, ou enviar direto para o e-mail " + emailContato + " </p>")
			.hide()
			.fadeIn(1500, function() {
			$('#form-erro');  
		});
		}
	});
	
	return false;
});