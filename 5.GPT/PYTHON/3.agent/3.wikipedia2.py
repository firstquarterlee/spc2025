from dotenv import load_dotenv

from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

from langchain_community.tools.wikipedia.tool import WikipediaQueryRun
from langchain_community.utilities.wikipedia import WikipediaAPIWrapper

wiki = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper(lang="ko"))

load_dotenv()

llm = OpenAI(temperature=0.2, max_tokens=500) # agent 선택과 연동을 해야 하는데? 창의적으로.. 이것저것?? XX 그래서, 명확하게 deterministic 하게...

tools = load_tools(["wikipedia", "llm-math"])
# tools = [wiki]

# 에이전츠 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할땐 끄는건데, 지금은 상세 내역을 살펴보기 위해서...
)

prompt = """
1. Find the list of public holidays in South Korea with their specific dates (month and day)
2. For each holiday, add the month number and day number, For example, January 1st, add 1 + 1 = 2
3. Tell me the sum of these numbers.
Please list each calculation step by step clearly.
"""

result = agent.invoke({"input": prompt})
print(result["output"])