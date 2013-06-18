var assert = require('chai').assert,
	setops = require('../index.js');

assert.deepEqualArray = function(a,b) {

	this.deepEqual(
		a.sort(function(a,b) { return a.id - b.id; }),
		b.sort(function(a,b) { return a.id - b.id; })
	);
}

function getFreshDataSet() {
	return [
		{ id : 2, old : 2, foo : 'bar' },
		{ id : 3, old : 3, foo : 'bar' },
		{ id : 5, old : 5, foo : 'bar' },
		{ id : 7, old : 7, foo : 'bar' },
		{ id : 11, old : 11, foo : 'bar' },
		{ id : 13, old : 13, foo : 'bar' },
		{ id : 17, old : 17, foo : 'bar' },
		{ id : 19, old : 19, foo : 'bar' },
		{ id : 23, old : 23, foo : 'bar' },
		{ id : 29, old : 29, foo : 'bar' },
		{ id : 31, old : 31, foo : 'bar' },
		{ id : 37, old : 37, foo : 'bar' }
	];
}

describe('converting old values to new values', function() {

	it('should list the operations properly', function() {

		var ds = getFreshDataSet();
		var operations = setops(ds.map(function(v) { return v.id; }))
			.transform(
				{ 2 : 3, 3 : 2 },
				function(oldValue, newValue) {
					return "converting " + oldValue + " to " + newValue;
				}
			);
		assert.sameMembers(operations, [
			'converting 2 to 38',
			'converting 3 to 2',
			'converting 38 to 3'
		]);
	});

	it('should not create conflicts', function() {

		var ds = getFreshDataSet();
		var operations = setops(ds.map(function(v) { return v.id; }))
			.transform(
				{ 2 : 7, 5 : 38, 3 : 2 },
				function(oldValue, newValue) {
					for(var i=0; i<ds.length; i++) {
						if(ds[i].id == oldValue)
							ds[i].id = +newValue;
					}
				}
			);
		var fiveSeven = ds.filter(function(row) {
			return row.old == 5 || row.old == 7;
		});
		assert.equal(fiveSeven.length, 2);
		assert.notEqual(fiveSeven[0].id, fiveSeven[1].id);
	});

	it('should manipulate the data properly', function() {

		var ds = getFreshDataSet();
		var operations = setops(ds.map(function(v) { return v.id; }))
			.transform(
				{ 2 : 3, 3 : 2 },
				function(oldValue, newValue) {
					for(var i=0; i<ds.length; i++) {
						if(ds[i].id == oldValue)
							ds[i].id = +newValue;
					}
				}
			);
		var target = [
			{ id : 3, old : 2, foo : 'bar' },
			{ id : 2, old : 3, foo : 'bar' },
			{ id : 5, old : 5, foo : 'bar' },
			{ id : 7, old : 7, foo : 'bar' },
			{ id : 11, old : 11, foo : 'bar' },
			{ id : 13, old : 13, foo : 'bar' },
			{ id : 17, old : 17, foo : 'bar' },
			{ id : 19, old : 19, foo : 'bar' },
			{ id : 23, old : 23, foo : 'bar' },
			{ id : 29, old : 29, foo : 'bar' },
			{ id : 31, old : 31, foo : 'bar' },
			{ id : 37, old : 37, foo : 'bar' }
		];
		assert.deepEqualArray(ds, target);
	});

	it('should list the more difficult operations properly', function() {

		var ds = getFreshDataSet();
		var operations = setops(ds.map(function(v) { return v.id; }))
			.transform(
				{
					11 : 13,
					19 : 2,
					13 : 6,
					31 : 1,
					1 : 29,
					2 : 15,
					23 : 23,
					37 : 5
				},
				function(oldValue, newValue) {
					return "converting " + oldValue + " to " + newValue;
				}
			);
		assert.sameMembers(operations, [
			'converting 29 to 38',
			'converting 1 to 29',
			'converting 2 to 15',
			'converting 13 to 6',
			'converting 11 to 13',
			'converting 19 to 2',
			'converting 31 to 1',
			'converting 5 to 39',
			'converting 37 to 5'
		]);
	});

	it('should list the more difficult operations properly (but in a different order)', function() {

		var ds = getFreshDataSet();
		var operations = setops(ds.map(function(v) { return v.id; }))
			.transform(
				{
					1 : 29,
					11 : 13,
					13 : 6,
					19 : 2,
					2 : 15,
					23 : 23,
					31 : 1,
					37 : 5
				},
				function(oldValue, newValue) {
					return "converting " + oldValue + " to " + newValue;
				}
			);
		assert.sameMembers(operations, [
			'converting 29 to 38',
			'converting 1 to 29',
			'converting 2 to 15',
			'converting 13 to 6',
			'converting 11 to 13',
			'converting 19 to 2',
			'converting 31 to 1',
			'converting 5 to 39',
			'converting 37 to 5'
		]);
	});

	it('should manipulate the more difficult data properly', function() {

		var ds = getFreshDataSet();
		setops(ds.map(function(v) { return v.id; }))
			.transform(
				{
					11 : 13,
					19 : 2,
					13 : 6,
					31 : 1,
					1 : 29,
					2 : 15,
					23 : 23,
					37 : 5
				},
				function(oldValue, newValue) {
					for(var i=0; i<ds.length; i++) {
						if(ds[i].id == oldValue)
							ds[i].id = +newValue;
					}
				}
			);
		var target = [
			{ id : 15, old : 2, foo : 'bar' },
			{ id : 3, old : 3, foo : 'bar' },
			{ id : 39, old : 5, foo : 'bar' },
			{ id : 7, old : 7, foo : 'bar' },
			{ id : 13, old : 11, foo : 'bar' },
			{ id : 6, old : 13, foo : 'bar' },
			{ id : 17, old : 17, foo : 'bar' },
			{ id : 2, old : 19, foo : 'bar' },
			{ id : 23, old : 23, foo : 'bar' },
			{ id : 38, old : 29, foo : 'bar' },
			{ id : 1, old : 31, foo : 'bar' },
			{ id : 5, old : 37, foo : 'bar' }
		];

		assert.deepEqualArray(ds, target);
	});

	it('should change categories properly', function() {
		var ds = [
			{ id : 2, language_code : "en-US", name : "Entertainment" },
			{ id : 4, language_code : "en-US", name : "Auto" },
			{ id : 6, language_code : "en-US", name : "Business" },
			{ id : 8, language_code : "en-US", name : "Creative Writing" },
			{ id : 10, language_code : "en-US", name : "Health" },
			{ id : 12, language_code : "en-US", name : "Home Improvement" },
			{ id : 14, language_code : "en-US", name : "Lifestyle" },
			{ id : 16, language_code : "en-US", name : "News" },
			{ id : 18, language_code : "en-US", name : "Sports" },
			{ id : 20, language_code : "en-US", name : "Tech" },
			{ id : 22, language_code : "en-US", name : "Travel" },
			{ id : 24, language_code : "pt-BR", name : "Carros & Máquinas" },
			{ id : 26, language_code : "pt-BR", name : "Casa e Jardim" },
			{ id : 28, language_code : "pt-BR", name : "Cidades" },
			{ id : 30, language_code : "pt-BR", name : "Cultura" },
			{ id : 32, language_code : "pt-BR", name : "Entretenimento" },
			{ id : 34, language_code : "pt-BR", name : "Esportes" },
			{ id : 36, language_code : "pt-BR", name : "Estilo de Vida" },
			{ id : 38, language_code : "pt-BR", name : "Literatura e Ensaios" },
			{ id : 40, language_code : "pt-BR", name : "Negócios" },
			{ id : 42, language_code : "pt-BR", name : "Notícias" },
			{ id : 44, language_code : "pt-BR", name : "Saúde" },
			{ id : 46, language_code : "pt-BR", name : "Tecnologia" },
			{ id : 48, language_code : "pt-BR", name : "Viagens e Turismo" }

		];

		setops(ds.map(function(v) { return v.id; }))
			.transform(
				{
					2 : 2, // Entertainment
					4 : 27, // Auto
					6 : 3, // Business
					8 : 47, // Creative Writing
					10 : 5, // Health
					12 : 6, // Home Improvement
					14 : 7, // Lifestyle
					16 : 62, // News
					18 : 14, // Sports
					20 : 15, // Tech
					22 : 16 // Travel
				},
				function(oldValue, newValue) {
					for(var i=0; i<ds.length; i++) {
						if(ds[i].id == oldValue)
							ds[i].id = +newValue;
					}
				}
			);


		var target = [
			{ id : 2, language_code : "en-US", name : "Entertainment" },
			{ id : 27, language_code : "en-US", name : "Auto" },
			{ id : 3, language_code : "en-US", name : "Business" },
			{ id : 47, language_code : "en-US", name : "Creative Writing" },
			{ id : 5, language_code : "en-US", name : "Health" },
			{ id : 6, language_code : "en-US", name : "Home Improvement" },
			{ id : 7, language_code : "en-US", name : "Lifestyle" },
			{ id : 62, language_code : "en-US", name : "News" },
			{ id : 14, language_code : "en-US", name : "Sports" },
			{ id : 15, language_code : "en-US", name : "Tech" },
			{ id : 16, language_code : "en-US", name : "Travel" },
			{ id : 24, language_code : "pt-BR", name : "Carros & Máquinas" },
			{ id : 26, language_code : "pt-BR", name : "Casa e Jardim" },
			{ id : 28, language_code : "pt-BR", name : "Cidades" },
			{ id : 30, language_code : "pt-BR", name : "Cultura" },
			{ id : 32, language_code : "pt-BR", name : "Entretenimento" },
			{ id : 34, language_code : "pt-BR", name : "Esportes" },
			{ id : 36, language_code : "pt-BR", name : "Estilo de Vida" },
			{ id : 38, language_code : "pt-BR", name : "Literatura e Ensaios" },
			{ id : 40, language_code : "pt-BR", name : "Negócios" },
			{ id : 42, language_code : "pt-BR", name : "Notícias" },
			{ id : 44, language_code : "pt-BR", name : "Saúde" },
			{ id : 46, language_code : "pt-BR", name : "Tecnologia" },
			{ id : 48, language_code : "pt-BR", name : "Viagens e Turismo" }
		];

		assert.deepEqualArray( ds, target );
	})


});
