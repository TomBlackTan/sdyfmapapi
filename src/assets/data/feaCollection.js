window.feaCollection = {
	"type": "FeatureCollection",
	"features": [{
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [102.0, 0.5]
		},
		"properties": {
			"prop0": "value0"
		}
	}, {
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [
				[102.0, 0.0],
				[103.0, 1.0],
				[104.0, 0.0],
				[105.0, 1.0]
			]
		},
		"properties": {
			"prop0": "value0",
			"prop1": 0.0
		}
	}, {
		"type": "Feature",
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[100.0, 0.0],
					[101.0, 0.0],
					[101.0, 1.0],
					[100.0, 1.0],
					[100.0, 0.0]
				]
			]
		},
		"properties": {
			"prop0": "value0",
			"prop1": {
				"this": "that"
			}
		}
	}
	]
}

// window.feaCollection = {
	window.feaCollection_geocnest = {
	"type": "FeatureCollection",
	"features": [{
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [102.0, 0.5]
		},
		"properties": {
			"prop0": "value0"
		}
	}, {
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [
				[102.0, 0.0],
				[103.0, 1.0],
				[104.0, 0.0],
				[105.0, 1.0]
			]
		},
		"properties": {
			"prop0": "value0",
			"prop1": 0.0
		}
	}, {
		"type": "Feature",
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[100.0, 0.0],
					[101.0, 0.0],
					[101.0, 1.0],
					[100.0, 1.0],
					[100.0, 0.0]
				]
			]
		},
		"properties": {
			"prop0": "value0",
			"prop1": {
				"this": "that"
			}
		}
	}, {
		"type": "Feature",
		"geometry": {
			"type": "GeometryCollection",
			"geometries": [{
				"type": "Point",
				"coordinates": [100.0, 0.0]
			}, {
				"type": "LineString",
				"coordinates": [
					[101.0, 0.0],
					[102.0, 1.0]
				]
			},
			]
		}, "properties": {
			"prop0": "GeometryCollection",
			"prop1": {
				"this": "that"
			}
		}
	}
	]
}