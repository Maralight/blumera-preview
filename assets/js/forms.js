(function(){
  "use strict";
  const form=document.querySelector("[data-rfq-form]");if(!form)return;
  const notice=form.querySelector("[data-form-notice]");
  function setError(field,message){field.setAttribute("aria-invalid",message?"true":"false");const box=field.closest(".field");const error=box&&box.querySelector(".field-error");if(error)error.textContent=message||""}
  form.addEventListener("submit",async e=>{
    e.preventDefault();let valid=true;
    form.querySelectorAll("[required]").forEach(field=>{let message="";if(field.type==="checkbox"&&!field.checked)message="Please confirm consent.";else if(!field.value.trim())message="This field is required.";else if(field.type==="email"&&!field.validity.valid)message="Enter a valid email address.";setError(field,message);if(message)valid=false});
    if(!valid){const first=form.querySelector("[aria-invalid='true']");first&&first.focus();return}
    const endpoint=(window.BLUMERA_CONFIG||{}).formEndpoint;
    if(!endpoint||endpoint.includes("REPLACE_")){notice.hidden=false;notice.textContent=`The enquiry form is ready, but its secure submission endpoint has not yet been connected. Please email ${(window.BLUMERA_CONFIG||{}).email||"info@blumeraltd.com"} or call ${(window.BLUMERA_CONFIG||{}).phoneDisplay||"0803 415 0171"}.`;notice.focus?.();return}
    try{const response=await fetch(endpoint,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});if(!response.ok)throw new Error("Submission failed");form.reset();notice.hidden=false;notice.textContent="Thank you. Your request has been submitted and Blumera will review it."}catch(error){notice.hidden=false;notice.textContent=`Your request could not be submitted. Please check your connection or email ${(window.BLUMERA_CONFIG||{}).email||"info@blumeraltd.com"}.`}
  });
  const requestedCategory=new URLSearchParams(location.search).get("category");if(requestedCategory){const select=form.querySelector("#category");if(select&&[...select.options].some(o=>o.text===requestedCategory))select.value=requestedCategory}
  form.querySelectorAll("input,select,textarea").forEach(field=>field.addEventListener("input",()=>{if(field.hasAttribute("aria-invalid"))setError(field,"")}));
})();
