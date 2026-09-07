namespace Terrasoft.Core.Process
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Diagnostics;
	using System.Drawing;
	using System.Globalization;
	using System.Text;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.Core.Process.Configuration;

	#region Class: UsrBpCreateVisaMethodsWrapper

	/// <exclude/>
	public class UsrBpCreateVisaMethodsWrapper : ProcessModel
	{

		public UsrBpCreateVisaMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
			AddScriptTaskMethod("ScriptTask2Execute", ScriptTask2Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			    var businessTripId = Get<Guid>("BusinessTripId");
			    
			    var stageSelect = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "UsrBusinessTripStage");
			    var columnId = stageSelect.AddColumn("Id");
			    stageSelect.Filters.Add(stageSelect.CreateFilterWithParameters(FilterComparisonType.Equal, "Name", "Согласована"));
			    var stageCollection = stageSelect.GetEntityCollection(UserConnection);
			    
			    if (stageCollection.Count == 0)
			    {
			        throw new Exception("Стадия 'Согласована' не найдена");
			    }
			    
			    var stageId = stageCollection[0].GetTypedColumnValue<Guid>(columnId.Name);
			    
			    // Обновляем заявку
			    var tripSchema = UserConnection.EntitySchemaManager.GetInstanceByName("UsrBusinessTrip");
			    var trip = tripSchema.CreateEntity(UserConnection);
			    
			    if (trip.FetchFromDB(businessTripId))
			    {
			        trip.SetColumnValue("UsrStageId", stageId);
			        trip.Save();
			    }
			    
			    return true;
		}

		private bool ScriptTask2Execute(ProcessExecutingContext context) {
			    var businessTripId = Get<Guid>("BusinessTripId");
			    
			    var stageSelect = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "UsrBusinessTripStage");
			    var columnId = stageSelect.AddColumn("Id");
			    stageSelect.Filters.Add(stageSelect.CreateFilterWithParameters(FilterComparisonType.Equal, "Name", "Отклонена"));
			    var stageCollection = stageSelect.GetEntityCollection(UserConnection);
			    
			    if (stageCollection.Count == 0)
			    {
			        throw new Exception("Стадия 'Отклонена' не найдена");
			    }
			    
			    var stageId = stageCollection[0].GetTypedColumnValue<Guid>(columnId.Name);
			    
			    // Обновляем заявку
			    var tripSchema = UserConnection.EntitySchemaManager.GetInstanceByName("UsrBusinessTrip");
			    var trip = tripSchema.CreateEntity(UserConnection);
			    
			    if (trip.FetchFromDB(businessTripId))
			    {
			        trip.SetColumnValue("UsrStageId", stageId);
			        trip.Save();
			    }
			    
			    return true;
		}

		#endregion

	}

	#endregion

}

