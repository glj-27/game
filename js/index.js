$(function(){
	// 1.监听游戏规则
	$(".rules").click(function(){
		
		$(".rule").stop().fadeIn(100);
		
	});
	
	// 2.监听关闭按钮
	$(".close").click(function(){
		
		$(".rule").stop().fadeOut(100);
		
	});
	
	// 3.监听开始按钮的点击
	$(".start").click(function(){
		$(this).stop().fadeOut(100);
		
		// 调用进度条走起的动画
		rogressHandler();
		
		// 灰太狼动画
		startWolfAnimation();
	});
	
	// 4.监听重新开始按钮
	$(".reStart").click(function(){
		// 关闭游戏结束界面
		$(".mask").stop().fadeOut(100);
		
		// 重新开启定时器
		rogressHandler();
		
		// 重新开始灰太狼动画
		startWolfAnimation();
		
		// 重置分数
		$(".score").text(0);
	});
	
	// 定义处理进度条的方法
	function rogressHandler(){
		
		// 重新设置进度条宽度为100%、
		$(".progress").css({
			width: 180
		});
		
		// 开启定时器处理进度条
		var timer = setInterval(function(){
			// 拿到进度条当前的宽度
			progressWidth = $(".progress").width(); 
			
			// 减少当前宽度
			progressWidth -= 1;
			
			// 设置新的宽度
			$(".progress").css({
				width:progressWidth
			}); 
			
			// 监听进度条是否走完
			if(progressWidth <= 0){
				// 关闭定时器
				clearInterval(timer);
				// 弹出游戏结束页面
				$(".mask").stop().fadeIn(100);
				// 停止灰太狼动画
				stopWolfAnimation();
			}
		}, 100);
	}
	
	var wolfTimer;
	// 定义灰太狼动画
	function startWolfAnimation(){
		
		// 1.定义两个数组保存回灰太郎和小灰灰的图片
		var wolf_1=['./pic/h0.png','./pic/h1.png','./pic/h2.png', './pic/h3.png','./pic/h4.png',
		            './pic/h5.png','./pic/h5.png','./pic/h7.png', './pic/h8.png','./pic/h9.png',]
		var wolf_2=['./pic/x0.png','./pic/x1.png','./pic/x2.png', './pic/x3.png','./pic/x4.png',
		            './pic/x5.png','./pic/x5.png','./pic/x7.png', './pic/x8.png','./pic/x9.png',]
		// 2.定义一个数组用来保存图片出现的位置
		var arrPos=[
			{left:"100px",top:"115px"},
			{left:"20px",top:"160px"},
			{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},
			{left:"19px",top:"221px"},
			{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},
			{left:"30px",top:"295px"},
			{left:"209px",top:"297px"}
		];
		
		// 3.创建一个图片
		var $wolfImage = $("<img src='' class='wolfImage'>")
		
		// 生成一个随机数0-7
		var posIndex = Math.round(Math.random() * 8); 
		
		// 4.设置图片显示的位置
		$wolfImage.css({
			position: "absolute",
			left: arrPos[posIndex].left, 
			top: arrPos[posIndex].top
		});
		
		// 随机获取数组类型
		var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
		
		// 5.设置图片的内容
		// 设置为全局变量
		window.wolfIndex = 0;
		window.wolfIndexEnd = 5;
		wolfTimer = setInterval(function(){
			if(wolfIndex > wolfIndexEnd){
				$wolfImage.remove();
				clearInterval(wolfTimer);
				startWolfAnimation();
			}
			$wolfImage.attr("src", wolfType[wolfIndex]);
			wolfIndex++;
		}, 200);
		
		// 6.将图片显示在界面上
		$(".container").append($wolfImage);
		
		// 7.调用处理游戏规则的方法
		gameRules($wolfImage);
	}
	
	// 得分机制
	function gameRules($wolfImage){
		$wolfImage.one("click", function(){
			// 修改索引
			window.wolfIndex = 5;
			window.wolfIndexEnd = 9;
			
			// 拿到当前点击图片的src
			var $src = $(this).attr("src");
			// 根据图片地址判断是否是灰太狼
			var $flag = $src.indexOf("h") >=0;
			// 根据点击的结果评分
			if($flag == true){
				// 如果是+10
				$(".score").text(parseInt($(".score").text()) + 10);
			}else{
				// 如果不是-10
				$(".score").text(parseInt($(".score").text()) - 10);
			}
			
			
		});
	}
	
	// 定制灰太狼动画
	function stopWolfAnimation(){
		$(".wolfImage").remove();
		clearInterval(wolfTimer);
	}
})