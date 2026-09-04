define("UsrBusinessTrip1MiniPage", [], function() {
	return {
		entitySchemaName: "UsrBusinessTrip",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrEstimatedCost": {
				"9955d8a3-0595-4b9b-864b-7f3c7bf2e8ab": {
					"uId": "9955d8a3-0595-4b9b-864b-7f3c7bf2e8ab",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"dataValueType": 4,
								"attribute": "UsrDaysCount"
							},
							"rightExpression": {
								"type": 0,
								"dataValueType": 4,
								"value": 3
							}
						}
					]
				},
				"d7fc820f-7f3d-49c9-9e07-79320c89c4e4": {
					"uId": "d7fc820f-7f3d-49c9-9e07-79320c89c4e4",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"dataValueType": 4,
								"attribute": "UsrDaysCount"
							},
							"rightExpression": {
								"type": 0,
								"dataValueType": 4,
								"value": 3
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
		    onEntityInitialized: function() {
		        this.callParent(arguments);		
		        this.on("change:UsrDepartureDate", this.onDatesChanged, this);
		        this.on("change:UsrReturnDate", this.onDatesChanged, this);
		    },
		
		    // Пересчёт количества дней
		    onDatesChanged: function() {
		        var departure = this.get("UsrDepartureDate");
		        var returnDate = this.get("UsrReturnDate");
		
		        if (!departure || !returnDate) {
		            return;
		        }
		
		        var diffMs = returnDate - departure;
		        var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
		
		        if (diffDays > 0) {
		            this.set("UsrDaysCount", diffDays);
		        } else {
		            this.set("UsrDaysCount", 0);
		        }
		    },
		
		    // Валидация дат перед сохранением
		    save: function() {
		        if (!this.validateDates()) {
		            return false;
		        }
		        return this.callParent(arguments);
		    },
		
		    validateDates: function() {
		        var departure = this.get("UsrDepartureDate");
		        var returnDate = this.get("UsrReturnDate");
		
		        if (departure && returnDate && returnDate < departure) {
		            Terrasoft.showInformation(
		                this.get("Resources.Strings.InvalidDatesMessage")
		            );
		            return false;
		        }
		        return true;
		    }
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "HeaderContainer",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "insert",
				"name": "HeaderColumnContainer",
				"values": {
					"itemType": 6,
					"caption": {
						"bindTo": "getPrimaryDisplayColumnValue"
					},
					"labelClass": [
						"label-in-header-container"
					],
					"visible": {
						"bindTo": "isNotAddMode"
					}
				},
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrDestinationCity30b40e76-94be-4c92-9cfa-3827dad3df58",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"bindTo": "UsrDestinationCity"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrDepartureDate255823f4-7e8f-41fb-a9c8-1ac99004676a",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"bindTo": "UsrDepartureDate"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrReturnDate84ba34b4-f70e-432c-b89a-c78aa63d2c38",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"bindTo": "UsrReturnDate"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrEmployeefdb7918e-9812-482a-a2d6-1e89f6dce9ec",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"bindTo": "UsrEmployee"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrEstimatedCost2cc2df92-a51b-42cc-a4b7-6bb12fb3f7e2",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isAddMode"
					},
					"bindTo": "UsrEstimatedCost"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrDestinationCity1ffee482-4788-4f9f-8a21-0a6f4be8d9c3",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isEditMode"
					},
					"bindTo": "UsrDestinationCity"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrDepartureDatea2d406e3-337a-4b24-bb9d-546e53b891b9",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isEditMode"
					},
					"bindTo": "UsrDepartureDate"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "UsrReturnDate9d26defd-20fc-477b-9def-883afb6adbe0",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isEditMode"
					},
					"bindTo": "UsrReturnDate"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "UsrEmployeea63f0763-842e-4878-9215-9e1d8743ace0",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isEditMode"
					},
					"bindTo": "UsrEmployee"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "UsrEstimatedCostb211e312-e3e6-448c-99bc-d807b78d08dc",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isEditMode"
					},
					"bindTo": "UsrEstimatedCost"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "UsrDestinationCitye34a2243-6f9d-49fb-8f1b-ead7cdfb918b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isViewMode"
					},
					"bindTo": "UsrDestinationCity"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "UsrDepartureDate8880753d-2601-4920-84f9-c992c6691b0b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isViewMode"
					},
					"bindTo": "UsrDepartureDate"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "UsrReturnDated9581e59-6fde-4762-a0e8-d03ee06193ed",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isViewMode"
					},
					"bindTo": "UsrReturnDate"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "UsrEmployeee8e06e84-7c93-4431-8b4e-b295fce8fc96",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isViewMode"
					},
					"bindTo": "UsrEmployee"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "insert",
				"name": "UsrEstimatedCost474ae357-014d-457b-a391-184b443c5c9a",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "MiniPage"
					},
					"isMiniPageModelItem": true,
					"visible": {
						"bindTo": "isViewMode"
					},
					"bindTo": "UsrEstimatedCost"
				},
				"parentName": "MiniPage",
				"propertyName": "items",
				"index": 15
			}
		]/**SCHEMA_DIFF*/
	};
});
