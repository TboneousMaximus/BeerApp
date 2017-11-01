/**
 * ...
 * @author Tyson Van Prooijen
 */

class ModelBase
{
    private static instantiated:Model;
	public mainBase:MainBase;
	public main:Main;
	
	
	// commands
	public startupCommand:StartupCommand;
	
	
	// APIs
	public fileAPI:FileAPI;
	// public scrollAPI:ScrollAPI;
	public displayAPI:DisplayAPI;
	
	
	// SMELL: set these in log types
	public logAll:boolean = false;
	public logErrors:boolean = false;
	public logFunctions:boolean = false;
	public logImportant:boolean = false;
	public logInline:boolean = false;
	public logLoads:boolean = false;
	public logTesting:boolean = false;
	
	
	constructor(){}
	
	public static get():Model{
		if (!Model.instantiated) Model.instantiated = new Model();
		return Model.instantiated;
    }
}