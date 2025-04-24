export default function createParser(tokens) {
	let pos = 0;
	let currentToken = tokens[0] || { type: "EOF" };

	const eat = (expectedType) => {
		if (currentToken.type === expectedType) {
			pos++;
			currentToken = tokens[pos] || { type: "EOF" };
		} else {
			throw new Error(`Expected ${expectedType}, got ${currentToken.type}`);
		}
	};

	const parse_main = () => {
		if (SST()) {
			SST();
		} else if (classmain()) {
			classmain();
		} else if (abstractmain()) {
			abstractmain();
		} else {
			/* ε production */
			throw new Error("Syntax error in <main> at token: " + currentToken.type);
		}
	};
	const SST = () => {
		if (if_else()) {
			if_else();
		} else if (switchs()) {
			switchs();
		} else if (whiles()) {
			whiles();
		} else if (fors()) {
			fors();
		} else if (do_while()) {
			do_while();
		} else if (breaks()) {
			breaks();
		} else if (continues()) {
			continues();
		} else if (returns()) {
			returns();
		} else if (function_call()) {
			function_call();
		} else if (try_catch()) {
			try_catch();
		} else if (input()) {
			input();
		} else if (console()) {
			console();
		} else if (dec()) {
			dec();
		} else if (array_dec()) {
			array_dec();
		} else if (inc_dec()) {
			inc_dec();
		} else if (objcreate()) {
			objcreate();
		} else if (objectList()) {
			objectList();
		} else {
			throw new Error("Syntax error in <SST> at token: " + currentToken.type);
		}
	};
	const if_else = () => {
		if (currentToken.type === "if") {
			eat("if");
			eat("(");
			OE();
			eat(")");
			Body();
			elses();
		} else {
			throw new Error(
				"Syntax error in <if-else> at token: " + currentToken.type,
			);
		}
	};
	const OE = () => {
		if (AEOE_prime()) {
			AEOE_prime();
		} else {
			throw new Error("Syntax error in <OE> at token: " + currentToken.type);
		}
	};
	const OE_prime = () => {
		if (currentToken.type === "") {
			eat("");
		} else if (currentToken.type === "") {
			eat("");
		} else if (AEOE_prime()) {
			AEOE_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <OE'> at token: " + currentToken.type);
		}
	};
	const AE = () => {
		if (RE2AE_prime()) {
			RE2AE_prime();
		} else {
			throw new Error("Syntax error in <AE> at token: " + currentToken.type);
		}
	};
	const AE_prime = () => {
		if (currentToken.type === "&&") {
			eat("&&");
			RE2AE_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <AE'> at token: " + currentToken.type);
		}
	};
	const RE2 = () => {
		if (RE1RE2_prime()) {
			RE1RE2_prime();
		} else {
			throw new Error("Syntax error in <RE2> at token: " + currentToken.type);
		}
	};
	const RE2_prime = () => {
		if (R02RE1RE2_prime()) {
			R02RE1RE2_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <RE2'> at token: " + currentToken.type);
		}
	};
	const RE1 = () => {
		if (ERE1_prime()) {
			ERE1_prime();
		} else {
			throw new Error("Syntax error in <RE1> at token: " + currentToken.type);
		}
	};
	const RE1_prime = () => {
		if (R01ERE1_prime()) {
			R01ERE1_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <RE1'> at token: " + currentToken.type);
		}
	};
	const E = () => {
		if (TE_prime()) {
			TE_prime();
		} else {
			throw new Error("Syntax error in <E> at token: " + currentToken.type);
		}
	};
	const E_prime = () => {
		if (PMTE_prime()) {
			PMTE_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <E'> at token: " + currentToken.type);
		}
	};
	const T = () => {
		if (FT_prime()) {
			FT_prime();
		} else {
			throw new Error("Syntax error in <T> at token: " + currentToken.type);
		}
	};
	const T_prime = () => {
		if (MDMFT_prime()) {
			MDMFT_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <T'> at token: " + currentToken.type);
		}
	};
	const F = () => {
		if (consts()) {
			consts();
		} else if (inc_dec()) {
			inc_dec();
		} else if (currentToken.type === "(") {
			eat("(");
			OE();
			eat(")");
		} else if (currentToken.type === "!") {
			eat("!");
			F();
		} else {
			throw new Error("Syntax error in <F> at token: " + currentToken.type);
		}
	};
	const R01 = () => {
		if (a()) {
			a();
		} else if (currentToken.type === ">") {
			eat(">");
		} else if (awd()) {
			awd();
		} else if (currentToken.type === ">=") {
			eat(">=");
		} else {
			throw new Error("Syntax error in <R01> at token: " + currentToken.type);
		}
	};
	const R02 = () => {
		if (currentToken.type === "==") {
			eat("==");
		} else if (currentToken.type === "!=") {
			eat("!=");
		} else {
			throw new Error("Syntax error in <R02> at token: " + currentToken.type);
		}
	};
	const PM = () => {
		if (currentToken.type === "+") {
			eat("+");
		} else if (currentToken.type === "-") {
			eat("-");
		} else {
			throw new Error("Syntax error in <PM> at token: " + currentToken.type);
		}
	};
	const MDM = () => {
		if (currentToken.type === "*") {
			eat("*");
		} else if (currentToken.type === "/") {
			eat("/");
		} else if (currentToken.type === "%") {
			eat("%");
		} else {
			throw new Error("Syntax error in <MDM> at token: " + currentToken.type);
		}
	};
	const consts = () => {
		if (currentToken.type === "num_const") {
			eat("num_const");
		} else if (currentToken.type === "dec_const") {
			eat("dec_const");
		} else if (currentToken.type === "flag_const") {
			eat("flag_const");
		} else if (currentToken.type === "string_const") {
			eat("string_const");
		} else {
			throw new Error("Syntax error in <const> at token: " + currentToken.type);
		}
	};
	const inc_dec = () => {
		if (inc_dec_prime()) {
			inc_dec_prime();
			TS();
			eat("ID");
			option();
		} else if (TS()) {
			TS();
			eat("ID");
			option();
			inc_dec_prime();
		} else {
			throw new Error(
				"Syntax error in <inc-dec> at token: " + currentToken.type,
			);
		}
	};
	const inc_dec_prime = () => {
		if (currentToken.type === "++") {
			eat("++");
		} else if (currentToken.type === "--") {
			eat("--");
		} else {
			throw new Error(
				"Syntax error in <inc-dec'> at token: " + currentToken.type,
			);
		}
	};
	const option = () => {
		/* ε production */
		if (currentToken.type === ".") {
			eat(".");
			eat("ID");
			option();
		} else if (currentToken.type === "[") {
			eat("[");
			OE();
			eat("]");
			option();
		} else if (currentToken.type === "(") {
			eat("(");
			params();
			eat(")");
			option_prime();
		} else {
			throw new Error(
				"Syntax error in <option> at token: " + currentToken.type,
			);
		}
	};
	const option_prime = () => {
		if (currentToken.type === ".") {
			eat(".");
			eat("ID");
			option();
		} else {
			throw new Error(
				"Syntax error in <option'> at token: " + currentToken.type,
			);
		}
	};
	const Assign_st = () => {
		if (TS()) {
			TS();
			eat("ID");
			option();
			Assign_OP();
			OE();
		} else {
			throw new Error(
				"Syntax error in <Assign_st> at token: " + currentToken.type,
			);
		}
	};
	const Assign_OP = () => {
		if (currentToken.type === "=") {
			eat("=");
		} else if (currentToken.type === "+=") {
			eat("+=");
		} else if (currentToken.type === "-=") {
			eat("-=");
		} else if (currentToken.type === "*=") {
			eat("*=");
		} else if (currentToken.type === "/=") {
			eat("/=");
		} else {
			throw new Error(
				"Syntax error in <Assign_OP> at token: " + currentToken.type,
			);
		}
	};
	const TS = () => {
		if (currentToken.type === "this") {
			eat("this");
		} else if (currentToken.type === "super") {
			eat("super");
		} else {
			/* ε production */
			throw new Error("Syntax error in <TS> at token: " + currentToken.type);
		}
	};
	const Params = () => {
		if (ParamList()) {
			ParamList();
		} else {
			/* ε production */
			throw new Error(
				"Syntax error in <Params> at token: " + currentToken.type,
			);
		}
	};
	const ParamList = () => {
		if (currentToken.type === "ID") {
			eat("ID");
			eat(":");
			DT();
			ParamList_prime();
		} else {
			throw new Error(
				"Syntax error in <ParamList> at token: " + currentToken.type,
			);
		}
	};
	const ParamList_prime = () => {
		if (currentToken.type === ",") {
			eat(",");
			eat("ID");
			eat(":");
			DT();
			ParamList_prime();
		} else {
			/* ε production */
			throw new Error(
				"Syntax error in <ParamList'> at token: " + currentToken.type,
			);
		}
	};
	const DT = () => {
		if (currentToken.type === "num") {
			eat("num");
		} else if (currentToken.type === "dec") {
			eat("dec");
		} else if (currentToken.type === "flag") {
			eat("flag");
		} else if (currentToken.type === "string") {
			eat("string");
		} else if (currentToken.type === "obj") {
			eat("obj");
		} else {
			throw new Error("Syntax error in <DT> at token: " + currentToken.type);
		}
	};
	const Body = () => {
		if (SST()) {
			SST();
		} else if (currentToken.type === "{") {
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error("Syntax error in <Body> at token: " + currentToken.type);
		}
	};
	const MST = () => {
		/* ε production */
		if (SST()) {
			SST();
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error("Syntax error in <MST> at token: " + currentToken.type);
		}
	};
	const elses = () => {
		if (currentToken.type === "else") {
			eat("else");
			Body();
		} else {
			/* ε production */
			throw new Error("Syntax error in <else> at token: " + currentToken.type);
		}
	};
	const switchs = () => {
		if (currentToken.type === "switch") {
			eat("switch");
			eat("(");
			OE();
			eat(")");
			switch_body();
		} else {
			throw new Error(
				"Syntax error in <switch> at token: " + currentToken.type,
			);
		}
	};
	const switch_body = () => {
		if (currentToken.type === "{") {
			eat("{");
			cases();
			defaults();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <switch_body> at token: " + currentToken.type,
			);
		}
	};
	const cases = () => {
		if (currentToken.type === "case") {
			eat("case");
			OE();
			eat(":");
			eat("{");
			MST();
			eat("}");
			Break();
			cases();
		} else {
			/* ε production */
			throw new Error("Syntax error in <case> at token: " + currentToken.type);
		}
	};
	const Break = () => {
		if (currentToken.type === "exit") {
			eat("exit");
		} else {
			/* ε production */
			throw new Error("Syntax error in <Break> at token: " + currentToken.type);
		}
	};
	const defaults = () => {
		if (currentToken.type === "default") {
			eat("default");
			eat(":");
			eat("{");
			MST();
			eat("}");
		} else {
			/* ε production */
			throw new Error(
				"Syntax error in <default> at token: " + currentToken.type,
			);
		}
	};
	const whiles = () => {
		if (currentToken.type === "while") {
			eat("while");
			eat("(");
			OE();
			eat(")");
			Body();
		} else {
			throw new Error("Syntax error in <while> at token: " + currentToken.type);
		}
	};
	const fors = () => {
		if (currentToken.type === "repeat") {
			eat("repeat");
			eat("(");
			F1();
			eat(";");
			F2();
			eat(";");
			F3();
			eat(")");
			Body();
		} else {
			throw new Error("Syntax error in <for> at token: " + currentToken.type);
		}
	};
	const F1 = () => {
		if (Dec()) {
			Dec();
		} else if (OE()) {
			OE();
		} else {
			/* ε production */
			throw new Error("Syntax error in <F1> at token: " + currentToken.type);
		}
	};
	const F2 = () => {
		if (OE()) {
			OE();
		} else {
			/* ε production */
			throw new Error("Syntax error in <F2> at token: " + currentToken.type);
		}
	};
	const F3 = () => {
		if (OE()) {
			OE();
		} else {
			/* ε production */
			throw new Error("Syntax error in <F3> at token: " + currentToken.type);
		}
	};
	const Dec = () => {
		if (currentToken.type === "var") {
			eat("var");
			eat("ID");
			eat(":");
			DT();
			init();
			List();
		} else {
			throw new Error("Syntax error in <Dec> at token: " + currentToken.type);
		}
	};
	const List = () => {
		if (currentToken.type === ",") {
			eat(",");
			eat("ID");
			eat(":");
			DT();
			init();
			List();
		} else {
			/* ε production */
			throw new Error("Syntax error in <List> at token: " + currentToken.type);
		}
	};
	const init = () => {
		if (currentToken.type === "=") {
			eat("=");
			rest();
		} else {
			/* ε production */
			throw new Error("Syntax error in <init> at token: " + currentToken.type);
		}
	};
	const rest = () => {
		if (currentToken.type === "ID") {
			eat("ID");
			eat(":");
			DT();
			init();
		} else if (consts()) {
			consts();
		} else {
			throw new Error("Syntax error in <rest> at token: " + currentToken.type);
		}
	};
	const ObjectCreate = () => {
		if (currentToken.type === "new") {
			eat("new");
			eat("ID");
			eat("(");
			Arg();
			eat(")");
		} else {
			throw new Error(
				"Syntax error in <ObjectCreate> at token: " + currentToken.type,
			);
		}
	};
	const Arg = () => {
		if (OE()) {
			OE();
			Arg_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <Arg> at token: " + currentToken.type);
		}
	};
	const Arg_prime = () => {
		if (currentToken.type === ",") {
			eat(",");
			OE();
			Arg_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <Arg'> at token: " + currentToken.type);
		}
	};
	const Arraydec = () => {
		if (currentToken.type === "[") {
			eat("[");
			Elements();
			eat("]");
		} else {
			throw new Error(
				"Syntax error in <Arraydec> at token: " + currentToken.type,
			);
		}
	};
	const Elements = () => {
		if (OE()) {
			OE();
			EL_prime();
		} else {
			/* ε production */
			throw new Error(
				"Syntax error in <Elements> at token: " + currentToken.type,
			);
		}
	};
	const EL_prime = () => {
		if (currentToken.type === ",") {
			eat(",");
			OE();
			EL_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <EL'> at token: " + currentToken.type);
		}
	};
	const Objectlist = () => {
		if (currentToken.type === "{") {
			eat("{");
			PL();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <Objectlist> at token: " + currentToken.type,
			);
		}
	};
	const PL = () => {
		if (property()) {
			property();
			PL_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <PL> at token: " + currentToken.type);
		}
	};
	const PL_prime = () => {
		if (currentToken.type === ",") {
			eat(",");
			property();
			PL_prime();
		} else {
			/* ε production */
			throw new Error("Syntax error in <PL'> at token: " + currentToken.type);
		}
	};
	const property = () => {
		if (currentToken.type === "ID") {
			eat("ID");
			eat(":");
			colon_prime();
		} else {
			throw new Error(
				"Syntax error in <property> at token: " + currentToken.type,
			);
		}
	};
	const colon_prime = () => {
		if (OE()) {
			OE();
		} else if (function_call()) {
			function_call();
		} else {
			throw new Error(
				"Syntax error in <colon'> at token: " + currentToken.type,
			);
		}
	};
	const function_call = () => {
		if (currentToken.type === "fn") {
			eat("fn");
			eat("ID");
			eat("(");
			Params();
			eat(")");
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <function-call> at token: " + currentToken.type,
			);
		}
	};
	const do_while = () => {
		if (currentToken.type === "do") {
			eat("do");
			eat("{");
			MST();
			eat("}");
			eat("while");
			eat("(");
			OE();
			eat(")");
		} else {
			throw new Error(
				"Syntax error in <do-while> at token: " + currentToken.type,
			);
		}
	};
	const continues = () => {
		if (currentToken.type === "skip") {
			eat("skip");
		} else {
			throw new Error(
				"Syntax error in <continue> at token: " + currentToken.type,
			);
		}
	};
	const returns = () => {
		if (currentToken.type === "give") {
			eat("give");
			rop();
		} else {
			throw new Error(
				"Syntax error in <return> at token: " + currentToken.type,
			);
		}
	};
	const rop = () => {
		if (OE()) {
			OE();
		} else {
			/* ε production */
			throw new Error("Syntax error in <rop> at token: " + currentToken.type);
		}
	};
	const try_catch = () => {
		if (currentToken.type === "try") {
			eat("try");
			eat("{");
			MST();
			eat("}");
			TC();
		} else {
			throw new Error(
				"Syntax error in <try-catch> at token: " + currentToken.type,
			);
		}
	};
	const TC = () => {
		if (CC()) {
			CC();
		} else if (FC()) {
			FC();
		} else if (CC_prime()) {
			CC_prime();
			FC();
		} else {
			throw new Error("Syntax error in <TC> at token: " + currentToken.type);
		}
	};
	const CC = () => {
		if (currentToken.type === "catch") {
			eat("catch");
			CC_prime();
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error("Syntax error in <CC> at token: " + currentToken.type);
		}
	};
	const CC_prime = () => {
		if (currentToken.type === "(") {
			eat("(");
			eat("ID");
			eat(")");
		} else {
			/* ε production */
			throw new Error("Syntax error in <CC'> at token: " + currentToken.type);
		}
	};
	const FC = () => {
		if (currentToken.type === "finally") {
			eat("finally");
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error("Syntax error in <FC> at token: " + currentToken.type);
		}
	};
	const input = () => {
		if (currentToken.type === "prompt") {
			eat("prompt");
			eat("(");
			OE();
			eat(")");
		} else {
			throw new Error("Syntax error in <input> at token: " + currentToken.type);
		}
	};
	const console = () => {
		if (currentToken.type === "show") {
			eat("show");
			eat("(");
			Arg();
			eat(")");
		} else {
			throw new Error(
				"Syntax error in <console> at token: " + currentToken.type,
			);
		}
	};
	const classs = () => {
		if (currentToken.type === "class") {
			eat("class");
			eat("ID");
			Inheritance();
			eat("{");
			classEL();
			eat("}");
		} else {
			throw new Error("Syntax error in <class> at token: " + currentToken.type);
		}
	};
	const Inheritance = () => {
		if (currentToken.type === "extends") {
			eat("extends");
			eat("ID");
		} else {
			/* ε production */
			throw new Error(
				"Syntax error in <Inheritance> at token: " + currentToken.type,
			);
		}
	};
	const classEL = () => {
		if (Method()) {
			Method();
		} else if (Field()) {
			Field();
		} else if (Constructors()) {
			Constructors();
		} else {
			throw new Error(
				"Syntax error in <classEL> at token: " + currentToken.type,
			);
		}
	};
	const Method = () => {
		if (MethodN()) {
			MethodN();
			eat("(");
			Params();
			eat(")");
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <Method> at token: " + currentToken.type,
			);
		}
	};
	const MethodN = () => {
		if (currentToken.type === "ID") {
			eat("ID");
		} else if (currentToken.type === "#") {
			eat("#");
			eat("ID");
		} else {
			throw new Error(
				"Syntax error in <MethodN> at token: " + currentToken.type,
			);
		}
	};
	const Field = () => {
		if (FieldN()) {
			FieldN();
			FieldExp();
		} else {
			throw new Error("Syntax error in <Field> at token: " + currentToken.type);
		}
	};
	const FieldExp = () => {
		if (OE()) {
			OE();
		} else {
			/* ε production */
			throw new Error(
				"Syntax error in <FieldExp> at token: " + currentToken.type,
			);
		}
	};
	const FieldN = () => {
		if (currentToken.type === "ID") {
			eat("ID");
		} else if (currentToken.type === "#") {
			eat("#");
			eat("ID");
		} else {
			throw new Error(
				"Syntax error in <FieldN> at token: " + currentToken.type,
			);
		}
	};
	const Constructors = () => {
		if (currentToken.type === "constructor") {
			eat("constructor");
			eat("(");
			Params();
			eat(")");
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <Constructors> at token: " + currentToken.type,
			);
		}
	};
	const Abstract = () => {
		if (currentToken.type === "abstract") {
			eat("abstract");
			eat("class");
			eat("ID");
			Inheritance();
			AbsBody();
		} else {
			throw new Error(
				"Syntax error in <Abstract> at token: " + currentToken.type,
			);
		}
	};
	const AbsBody = () => {
		if (currentToken.type === "{") {
			eat("{");
			AbsMembers();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <AbsBody> at token: " + currentToken.type,
			);
		}
	};
	const AbsMembers = () => {
		if (AbsMethods()) {
			AbsMethods();
		} else if (ConcreteMeth()) {
			ConcreteMeth();
		} else if (Field()) {
			Field();
		} else {
			throw new Error(
				"Syntax error in <AbsMembers> at token: " + currentToken.type,
			);
		}
	};
	const AbsMethods = () => {
		if (currentToken.type === "abstract") {
			eat("abstract");
			eat("ID");
			eat("(");
			Params();
			eat(")");
		} else {
			throw new Error(
				"Syntax error in <AbsMethods> at token: " + currentToken.type,
			);
		}
	};
	const ConcreteMeth = () => {
		if (currentToken.type === "ID") {
			eat("ID");
			eat("(");
			Params();
			eat(")");
			eat("{");
			MST();
			eat("}");
		} else {
			throw new Error(
				"Syntax error in <ConcreteMeth> at token: " + currentToken.type,
			);
		}
	};
	return {
		parse: () => parse_main(),
	};
}
