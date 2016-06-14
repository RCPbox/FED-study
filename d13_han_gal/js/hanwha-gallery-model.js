( function(global, hw){
	'use strict';
	hw.model = [
					{
						'href'     : '/contents/page-01.html',
						'image'    : 'images/gallery-01.jpg',
						'headline' : 'Hanwha Group Acquires German Automotive Component Manufacturer',
						'summary'  : 'Hanwha Advanced Materials acquires an automotive component supplier to BMW, Audi, and other well-known brands'
					},
					{
						'href'     : '/contents/page-02.html',
						'image'    : 'images/gallery-02.jpg',
						'headline' : 'Hanwha Q CELLS Opens Doors into U.S. Solar Market',
						'summary'  : 'In February 2015 Hanwha Q CELLS emerged as a new global solar power leader from combining two of the world\'s most recognized photovoltaic manufacturers, Hanwha SolarOne and Hanwha Q CELLS. The merger comes only four years after Hanwha Group first launched its solar business. Hanwha Q CELLS recently took its efforts to become a world’s leading total solar energy solution provider to the next level by signing the largest single supply contract to date in the industry.'
					},
					{
						'href'     : '/contents/page-03.html',
						'image'    : 'images/gallery-03.png',
						'headline' : 'Hanwha Group and Chungcheong Province in Korea Found the Chungnam Center for Creative Economy',
						'summary'  : ' Hanwha Group and South Chungcheong Province inaugurated the Chungnam Center for Creative Economy, located in the central region of Korea in South Chungcheong Province, on May 22nd. The Korean government is planning to found Creative Economy Centers in 17 regions throughout Korea. The Creative Economy Center is expected to play a pivotal role invigorating the regional economy by supporting startups, enhancing a program for win-win growth between large companies and small- and medium-sized enterprises (SMEs), and supporting an increase in income of rural agricultural and commercial communities.'
					},
					{
						'href'     : '/contents/page-04.html',
						'image'    : 'images/gallery-04.png',
						'headline' : 'Hanwha Group\'s Petrochem Business Aims to Become a Global Leader',
						'summary'  : 'Hanwha Group completed the acquisition of the management rights of two of the four Samsung subsidiaries that have been in the process of being merged with the company since late 2014, Samsung General Chemicals and Samsung Total Petrochemicals, re-launching the two companies as Hanwha Group subsidiaries.'
					},
					{
						'href'     : '/contents/page-05.html',
						'image'    : 'images/gallery-05.png',
						'headline' : 'Hanwha Life Boosts Its Presence',
						'summary'  : 'in the Asian Market Hanwha Life Insurance, founded in 1946 as Korea\'s first life insurance company, is forging ahead to become an Asian insurance powerhouse. Rewriting the history of Korean insurance as the first company to expand overseas as well as the first insurance company to have established a wholly-owned local subsidiary, Hanwha Life is accelerating its efforts to become the leading insurance company in China, Indonesia and other Asian markets by building on its successes in Vietnam.'
					},
					{
						'href'     : '/contents/page-06.html',
						'image'    : 'images/gallery-06.png',
						'headline' : 'Hanwha Q CELLS Announces over 1.5 GW Solar Module Supply Agreement to Power NextEra Energy Resources’ Continued Solar Investments in the U.S.',
						'summary'  : 'Hanwha Q CELLS Co. Ltd today announced the signing of a major solar module supply agreement with NextEra Energy Resources, LLC, a subsidiary of one of the world’s largest clean energy companies, U.S.-based NextEra Energy, Inc.'
					},
					{
						'href'     : '/contents/page-07.html',
						'image'    : 'images/gallery-07.png',
						'headline' : 'Hanwha Wins Additional $2.12 Billion Construction Project in Iraq, Totaling over $10 Billion in the Bismayah New City Alone',
						'summary'  : 'Hanwha Group signed an order for an additional $2.12 billion in social infrastructure construction for the Bismayah New City project, just four months after the visit of Chairman Seung Youn Kim to Iraq in late 2014.'
					},
					{
						'href'     : '/contents/page-08.html',
						'image'    : 'images/gallery-08.png',
						'headline' : 'Hanwha Group Acquires German Automotive Component Manufacturer',
						'summary'  : 'Hanwha Advanced Materials acquires an automotive component supplier to BMW, Audi, and other well-known brands'
					},
					{
						'href'     : '/contents/page-09.html',
						'image'    : 'images/gallery-09.jpg',
						'headline' : 'Hanwha Launches the World\'s Largest Solar Energy Company',
						'summary'  : 'in Terms of Cell Production Hanwha Group becomes the world’s leading solar energy company in terms of cell production by integrating Hanwha SolarOne Co., Ltd. and Hanwha Q CELLS Investment Co.'
					},
					{
						'href'     : '/contents/page-10.html',
						'image'    : 'images/gallery-10.jpg',
						'headline' : 'Hanwha Chairman Seung Youn Kim Visited the Bismayah New City Project(BNCP) Site in Iraq',
						'summary'  : 'BNCP is a mega construction project to build 100,000 residential units'
					},
					{
						'href'     : '/contents/page-11.html',
						'image'    : 'images/gallery-11.jpg',
						'headline' : 'Hanwha Has Completed Building 24 MW Solar Power Plant in Kitsuki, Oita prefecture, in Japan',
						'summary'  : 'Hanwha Group is accelerating its leading position in the Japanese solar power market with the construction of a large-scale 24 MW solar power plant'
					},
					{
						'href'     : '/contents/page-12.html',
						'image'    : 'images/gallery-12.png',
						'headline' : 'Hanwha Q CELLS, Promoting Sustainable Solar Energy with R&D Leadership',
						'summary'  : 'Hanwha Q CELLS has been opening up new possibilities for the solar energy business while pioneering unexplored fields on the strengths of its world leading R&D capacity and technologies.'
					},
				];

	// ECMA Script v5 , IE 9+
	// 객체의 속성을 수정하지 못하도록 설정(Only GET)
	Object.defineProperty(global, 'hanwha', {
		'value'        : hw,
		'writable'     : false, // 수정 가능한지 여부 설정.
		'enumerable'   : false, // 속성이 for ~ in , Object.keys()에 노출 여부 설정.
		'configurable' : false // 객체에서 해당키가 제거될 수 있는지 설정.
	});



} )(window, ( window.hanwha = window.hanwha || {} ) );
//빈 객체 하나 던지고
//hanwha 라는 큰 객체를 만든 다음에 모델속성 뷰속성 콘트롤속성을 만드는게 더 관리가 용이할 것.