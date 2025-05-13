import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_openai import ChatOpenAI
from langchain_chains import LLMMathChain
from langchain.tools import Tool

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

llm_math_chain = LLMathChain.from_llm(llm=llm, verbose=True)
search = GoogleSearchAPIWrapper()
wikipedia = WikipediaAPIWrapper()

tools = [
  Tool(
    name= "Search",
    func=search.run,
    description="Useful for answering questions using Google Search"
    ),
  
    Tool(
      name= "Wikipedia",
      func=wikipedia.run,
      description="Useful for looking up facts and statistics."
    ),
    
      Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="Useful for answering math-releted questions or calculations."
    ),
]

planner = load_chst_planner(llm)
executor = load_agent_executor(llm, tools, verbose=True)

agent = PlanAndExecute(planner=planner, executor=executor, verbose=True)

prompt = "1988년도 하계 올림픽을 개최한 나라는?"
result = agent.invoke(prompt)

print(result)


