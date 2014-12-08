a:36:{i:0;a:3:{i:0;s:14:"document_start";i:1;a:0:{}i:2;i:0;}i:1;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:6:"RepACL";i:1;i:3;i:2;i:1;}i:2;i:1;}i:2;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:3;}i:2;i:1;}i:3;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1;}i:4;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:13:"RepACL is an ";}i:2;i:19;}i:5;a:3:{i:0;s:7:"acronym";i:1;a:1:{i:0;s:3:"API";}i:2;i:32;}i:6;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:62:" that implements in Repast a group of concepts related to the ";}i:2;i:35;}i:7;a:3:{i:0;s:7:"acronym";i:1;a:1:{i:0;s:4:"FIPA";}i:2;i:97;}i:8;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:44:" interaction protocols. RepACL was based on ";}i:2;i:101;}i:9;a:3:{i:0;s:7:"acronym";i:1;a:1:{i:0;s:4:"JADE";}i:2;i:145;}i:10;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:92:"'s implementation of these protocols, therefore making the conversion of Repast projects to ";}i:2;i:149;}i:11;a:3:{i:0;s:7:"acronym";i:1;a:1:{i:0;s:4:"JADE";}i:2;i:241;}i:12;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:53:" applications more straightforward, using MASSim2Dev.";}i:2;i:245;}i:13;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:298;}i:14;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:298;}i:15;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:59:"This page tried to document the structure and usage of the ";}i:2;i:300;}i:16;a:3:{i:0;s:7:"acronym";i:1;a:1:{i:0;s:3:"API";}i:2;i:359;}i:17;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:32:" and provide some code examples.";}i:2;i:362;}i:18;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:394;}i:19;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:396;}i:20;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:7:"Classes";i:1;i:4;i:2;i:396;}i:2;i:396;}i:21;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:4;}i:2;i:396;}i:22;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:413;}i:23;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:8:"Examples";i:1;i:4;i:2;i:413;}i:2;i:413;}i:24;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:4;}i:2;i:413;}i:25;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:430;}i:26;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:24:"Basic Agent and Behavior";i:1;i:5;i:2;i:430;}i:2;i:430;}i:27;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:430;}i:28;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:430;}i:29;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:104:"This example requires that the RepACL and the Repast Simphony libraries be added to the Java build path.";}i:2;i:462;}i:30;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:566;}i:31;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:146:"
import up.fe.liacc.repacl.Agent;

public class MyAgent extends Agent{
	
	public MyAgent() {
		super();
		addBehavior(new MyBehavior(this));
	}
}
";i:1;s:4:"java";i:2;s:13:"|MyAgent.java";}i:2;i:573;}i:32;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:386:"
import repast.simphony.engine.schedule.ScheduledMethod;
import up.fe.liacc.repacl.Agent;
import up.fe.liacc.repacl.proto.Behavior;

public class MyBehavior extends Behavior{
	
	public MyBehavior(Agent owner) {
		super(owner); // Sets the owner of this behavior.
	}
	
	@ScheduledMethod(start = 1, interval = 1)
	public void action() {
		System.out.println("Behaviour execution.");
	}
}
";i:1;s:4:"java";i:2;s:16:"|MyBehavior.java";}i:2;i:753;}i:33;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:389:"
import repast.simphony.context.Context;
import repast.simphony.dataLoader.ContextBuilder;

public class MyContextBuilder implements ContextBuilder<Object> {

	@Override
	public Context<Object> build(Context<Object> context) {

		context.setId("test");
		
		// Create agent
		MyAgent t = new MyAgent();
		// Add the agent to the Repast context.
		context.add(t);
		
		return context;
	}
}
";i:1;s:4:"java";i:2;s:22:"|MyContextBuilder.java";}i:2;i:1176;}i:34;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:1601;}i:35;a:3:{i:0;s:12:"document_end";i:1;a:0:{}i:2;i:1601;}}