interface CaseProps {
  id: string
  caseName: string
  caseType: string
  caseBody: string
  caseImg: string
  caseLogo1: string
  caseLogo2: string
}

const CaseContent = ({
  id,
  caseName,
  caseType,
  caseBody,
  caseImg,
  caseLogo1,
  caseLogo2,
}: CaseProps) => {
  return (
    <div id={id}>
      <p>{caseName}</p>
      <p>{caseType}</p>
      <p>{caseBody}</p>
      <p>{caseImg}</p>
      <p>{caseLogo1}</p>
      <p>{caseLogo2}</p>
    </div>
  )
}

export default CaseContent
