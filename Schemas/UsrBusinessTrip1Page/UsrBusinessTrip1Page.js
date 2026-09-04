define("UsrBusinessTrip1Page", [], function() {
	return {
		entitySchemaName: "UsrBusinessTrip",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrBusinessTripFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrBusinessTrip"
				}
			},
			"VisaDetailV202134e62": {
				"schemaName": "VisaDetailV2",
				"entitySchemaName": "UsrBusinessTripVisa",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrBusinessTrip"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrRejectionReason": {
				"8f849b2b-57ac-4015-93ac-2483b2f39c34": {
					"uId": "8f849b2b-57ac-4015-93ac-2483b2f39c34",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"dataValueType": 10,
								"attribute": "UsrStage"
							},
							"rightExpression": {
								"type": 0,
								"dataValueType": 10,
								"value": "ea82cef4-5081-4185-8404-556873aea015"
							}
						}
					]
				},
				"6b0b5159-6d8f-48e5-bd65-a98f50eaae5d": {
					"uId": "6b0b5159-6d8f-48e5-bd65-a98f50eaae5d",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"dataValueType": 10,
								"attribute": "UsrStage"
							},
							"rightExpression": {
								"type": 0,
								"dataValueType": 10,
								"value": "ea82cef4-5081-4185-8404-556873aea015"
							}
						}
					]
				}
			},
			"UsrEstimatedCost": {
				"66f25a97-e436-470d-a8a2-c49dd44c8ee4": {
					"uId": "66f25a97-e436-470d-a8a2-c49dd44c8ee4",
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
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
		    onEntityInitialized: function() {
		        this.callParent(arguments);
		        this.on("change:UsrDepartureDate", this.onDatesChanged, this);
		        this.on("change:UsrReturnDate", this.onDatesChanged, this);
		    },
		    // Общий обработчик изменения дат
		    onDatesChanged: function() {
		        var departure = this.get("UsrDepartureDate");
		        var returnDate = this.get("UsrReturnDate");
		
		        if (!departure || !returnDate) {
		            return;
		        }
		
		        // Разница в миллисекундах
		        var diffMs = returnDate - departure;
		
		        // Переводим в дни
		        var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
		
		        if (diffDays > 0) {
		            this.set("UsrDaysCount", diffDays);
		        } else {
		            this.set("UsrDaysCount", 0);
		        }
		    },
		    save: function() {
		        if (!this.validateDates()) {
		            return false;
		        }
		
		        return this.callParent(arguments);
		    },
		
		    validateDates: function() {
		        var departure = this.get("UsrDepartureDate");
		        var returnDate = this.get("UsrReturnDate");
		
		        // Если обе даты заполнены и возвращение раньше выезда
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
				"operation": "insert",
				"name": "UsrNumber4cd4ec43-252b-48a5-829b-fc6537e4feec",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrNumber",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrDestinationCity618e895b-a20a-4585-b149-07fd8eaaa84f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrDestinationCity"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrTripPurposeace1fc47-b111-4593-8a88-1f34a8436993",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrTripPurpose"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrDaysCount2a6945a0-0554-47fa-98d4-ca9b116b5502",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrDaysCount",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrEstimatedCoste5b4316e-2d7a-4d7f-8b75-f8a48f43af28",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrEstimatedCost",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrEmployee6f32d267-aae2-4c40-9653-8290af310ec8",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrEmployee"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrDepartureDate6b90170f-d86f-43f9-80ed-4ffb4718d9ba",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrDepartureDate"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrCommentb7836585-4d8c-4e32-94dd-97abea0d964d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 2,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrReturnDate2e0aaba5-cb42-44e9-a48d-4fa5ddbd8789",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrReturnDate"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrOwner406e0332-15a6-40c8-90d8-7b506c209be2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrOwner"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrRejectionReasonb645a4ec-de81-47b7-83fa-10549535cf8a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrRejectionReason"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab1aab3a14TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabVisaCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "VisaDetailV202134e62",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab1aab3a14TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "remove",
				"name": "ESNFeedContainer"
			},
			{
				"operation": "remove",
				"name": "ESNFeed"
			}
		]/**SCHEMA_DIFF*/
	};
});
